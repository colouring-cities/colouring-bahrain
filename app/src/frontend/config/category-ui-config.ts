import { Category } from './categories-config';

import PlanningConservationContainer from '../building/data-containers/planning-conservation';
import CommunityContainer from '../building/data-containers/community';
import AgeHistoryContainer from '../building/data-containers/age-history';
import DisasterManagementContainer from '../building/data-containers/disaster-management';
import LocationContainer from '../building/data-containers/location';
import UrbanInfrastructureContainer from '../building/data-containers/urban-infrastructure';
import ConstructionDesignContainer from '../building/data-containers/construction-design';
import RetrofitConditionContainer from '../building/data-containers/retrofit-condition';
import WaterGreenInfrastructureContainer from '../building/data-containers/water-green-infrastructure';
import EnergyPerformanceContainer from '../building/data-containers/energy-performance';
import TypologySizeContainer from '../building/data-containers/typology-size';
import LandUseContainer from '../building/data-containers/land-use';

import { DataContainerType } from '../building/data-container';

export const categoryUiConfig: {[key in Category]: DataContainerType} = {
    [Category.Mapping]: LocationContainer,
    [Category.AgeHistory]: AgeHistoryContainer,
    [Category.Morphology]: TypologySizeContainer,
    [Category.ConstructionDesign]: ConstructionDesignContainer,
    [Category.LandUse]: LandUseContainer,
    [Category.Conservation]: PlanningConservationContainer,
    [Category.Assessment]: RetrofitConditionContainer,
    [Category.InvestmentEngagement]: CommunityContainer,
    [Category.DisasterManagement]: DisasterManagementContainer,
    // Coming Soon categories - mapped to placeholder containers
    [Category.GreenUrbanInfrastructure]: WaterGreenInfrastructureContainer,
    [Category.CommerceActivity]: LandUseContainer,
    [Category.Social]: CommunityContainer,
    // Legacy categories kept for backward compatibility
    [Category.Location]: LocationContainer,
    [Category.TypologySize]: TypologySizeContainer,
    [Category.PlanningConservation]: PlanningConservationContainer,
    [Category.RetrofitCondition]: RetrofitConditionContainer,
    [Category.EnergyPerformance]: EnergyPerformanceContainer,
    [Category.UrbanInfrastructure]: UrbanInfrastructureContainer,
    [Category.WaterGreenInfrastructure]: WaterGreenInfrastructureContainer,
    [Category.Community]: CommunityContainer,
};

