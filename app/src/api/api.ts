import bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs';
import path from 'path';

import autofillController from './controllers/autofillController';
import * as editHistoryController from './controllers/editHistoryController';
import { ApiParamError, ApiUserError } from './errors/api'; 
import { DatabaseError } from './errors/general';
import buildingsRouter from './routes/buildingsRouter';
import extractsRouter from './routes/extractsRouter';
import leaderboardRouter from './routes/leaderboardRouter';
import usersRouter from './routes/usersRouter';
import { queryLocation } from './services/search';
import { authUser, getNewUserAPIKey, logout } from './services/user';
import { getFeatureCollectionForTable, MAP_LAYER_SLUG_TO_TABLE } from './services/mapOverlayGeoJson';
import db from '../db';

const server = express.Router();

// parse POSTed json body
server.use(bodyParser.json());

server.use('/buildings', buildingsRouter);
server.use('/users', usersRouter);
server.use('/extracts', extractsRouter);
server.use('/leaderboard', leaderboardRouter);

server.get('/history', editHistoryController.getGlobalEditHistory);
server.get('/autofill', autofillController.getAutofillOptions);

// POST user auth
server.post('/login', function (req, res) {
  authUser(req.body.username, req.body.password).then(function (user: any) { 
        
        // 1. Set the session data (as before)
    if (user.user_id) {
      req.session.user_id = user.user_id;
    } else {
      req.session.user_id = undefined;
    }
        
        // 2. EXPLICITLY SAVE THE SESSION AND WAIT FOR THE CALLBACK
        // This ensures express-session has updated the DB before sending headers
        req.session.save((err) => {
            if (err) {
                // Handle session save error (e.g., DB failure)
                console.error("Session save error:", err);
                return res.status(500).send({ error: 'Session error' });
            }
            // 3. Send the response ONLY after the session is saved
            res.send(user);
        });
        
  }).catch(function (error) {
    res.send(error);
  });
});

// POST user logout
server.post('/logout', function (req, res) {
    logout(req.session).then(() => {
        res.send({ success: true });
    }).catch(err => {
        console.error(err);
        res.send({ error: 'Failed to end session'});
    });
});

// POST generate API key
server.post('/api/key', function (req, res) {
    if (!req.session.user_id) {
        res.send({ error: 'Must be logged in' });
        return;
    }

    getNewUserAPIKey(req.session.user_id).then(function (apiKey) {
        res.send(apiKey);
    }).catch(function (error) {
        res.send(error);
    });
});

// GET search
server.get('/search', function (req, res) {
    const searchTerm = req.query.q;
    if (!searchTerm) {
        res.send({
            error: 'Please provide a search term'
        });
        return;
    }
    queryLocation(searchTerm).then((results) => {
        if (typeof (results) === 'undefined') {
            res.send({
                error: 'Database error'
            });
            return;
        }
        res.send({
            results: results.map(item => {
                // map from DB results to GeoJSON Feature objects
                const geom = JSON.parse(item.st_asgeojson);
                return {
                    type: 'Feature',
                    attributes: {
                        label: item.search_str,
                        zoom: item.zoom || 9
                    },
                    geometry: geom
                };
            })
        });
    }).catch(function (error) {
        res.send(error);
    });
});

// GET governorates - static GeoJSON (see public/geometries/governorates.geojson)
server.get('/governorates', function (req, res) {
    const geojsonPath = path.join(
        process.env.RAZZLE_PUBLIC_DIR || path.join(__dirname, '..', '..', 'public'),
        'geometries',
        'governorates.geojson'
    );
    fs.readFile(geojsonPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading governorates GeoJSON:', err);
            res.status(500).json({ error: 'Governorate geometry file not found' });
            return;
        }
        res.type('json').send(data);
    });
});

// GET map overlay layers (PostGIS) — slugs: parcels | protection-zones | moh-zones | green-water
server.get('/map-layers/:slug', function (req, res) {
    const table = MAP_LAYER_SLUG_TO_TABLE[req.params.slug];
    if (!table) {
        res.status(404).json({ error: 'Unknown map layer' });
        return;
    }
    getFeatureCollectionForTable(table)
        .then((geojson) => {
            res.json(geojson);
        })
        .catch(function (error) {
            console.error('Error fetching map layer:', req.params.slug, error);
            res.status(500).json({ error: 'Database error' });
        });
});

// Handle geometries requests - return 404 as JSON instead of HTML
server.get('/geometries/*', (req: express.Request, res: express.Response) => {
    res.status(404).json({ error: 'Geometry file not found', path: req.path });
});

server.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err != undefined) {
        if (err instanceof ApiUserError) {
            let errorMessage: string;
            
            if(err instanceof ApiParamError) {
                errorMessage = `Problem with parameter ${err.paramName}: ${err.message}`;
            } else {
                errorMessage = err.message;
            }
            
            return res.status(400).send({ error: errorMessage });
        }
        
        // we need to log the error only if it's not an api user error
        console.log('Global error handler: ', err);
        
        if(err instanceof DatabaseError){
            res.status(500).send({ error: 'Database error' });
        } else {
            res.status(500).send({ error: 'Server error' });
        }
        
    }
});

server.use((req, res) => {
    res.status(404).json({ error: 'Resource not found'});
});


export default server;
