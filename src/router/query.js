import Query from '@/containers/Query/List'

export default {
  path: 'query',
  component: {
    template: '<router-view></router-view>'
  },
  children: [
    { path: 'list', component: Query }
  ]
}
