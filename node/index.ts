import { method, Service, ServiceContext } from '@vtex/api'

export default new Service({
  routes: {
    appSettings: method({
      GET: async (context: ServiceContext) => {
        const response = await context.clients.apps.getAppSettings(
          process.env.VTEX_APP_ID!
        )

        context.body = response
        context.status = 200
        context.set('cache-control', 'no-cache')
      },
    }),
  },
})
