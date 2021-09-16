import Vue from 'vue';
import VueRouter from 'vue-router';

import About from '../components/about/About.vue';
import AdminPages from '../components/admin/AdminPages.vue';
import Auth from '../components/auth/Auth.vue';
import BrSerieATeams from '../components/brserieateam/BrSerieATeams.vue';
import BrSerieBTeams from '../components/brseriebteam/BrSerieBTeams';
import Home from '../components/home/Home.vue';
import NoticeById from '../components/notice/NoticeById.vue';
import NoticeViews from '../components/notice/NoticeViews.vue';

Vue.use(VueRouter);

const routes = [{
    name: 'about',
    path: '/about',
    component: About,
},
{
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
},
{
    name: 'auth',
    path: '/auth',
    component: Auth
},
{
    name: 'brSerieATeams',
    path: '/brserieateams',
    component: BrSerieATeams
},
{
    name: 'brSerieBTeams',
    path: '/brseriebteams',
    component: BrSerieBTeams
},
{
    name: 'home',
    path: '/',
    component: Home
},
{
    name: 'noticeById',
    path: '/notices/:id',
    component: NoticeById
},
{
    name: 'noticeViews',
    path: '/notices',
    component: NoticeViews
}]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

export default router;