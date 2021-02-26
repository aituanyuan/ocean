import Login from '@/compose/Login';
import MapDisplay from '../compose/mapDisplay/NunjaMap';
import UpLoadOceanData from '../compose/uploadData/UpLoadOceanData';
import SystemSetting from '../compose/SystemSetting/SystemSetting';
import OverView from '../compose/OverView';
import GeovisUsers from '../compose/SystemSetting/GeovisUsers';
import GeovisRoles from '../compose/SystemSetting/GeovisRoles';
import GeovisAuthority from '../compose/SystemSetting/GeovisAuthority';
import GeovisMenus from '../compose/SystemSetting/GeovisMenus';
import GeovisDepartment from '../compose/SystemSetting/GeovisDepartment';
const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/upLoad',
        name: 'upLoad',
        component: UpLoadOceanData
    },
    {
        path: '/show',
        name: 'show',
        component: MapDisplay
    },
    {
        path: '/setting',
        name: 'setting',
        component: SystemSetting,
        children: [
            {
                path: '/setting/users',
                name: 'users',
                component: GeovisUsers
            },
            {
                path: '/setting/roles',
                name: 'roles',
                component: GeovisRoles
            },
            {
                path: '/setting/authority',
                name: 'authority',
                component: GeovisAuthority
            },
            {
                path: '/setting/menus',
                name: 'menus',
                component: GeovisMenus
            },
            {
                path: '/setting/dept',
                name: 'dept',
                component: GeovisDepartment
            }
        ]
    },
    {
        path: '/overview',
        name: 'overview',
        component: OverView
    }
];

export default routes;
