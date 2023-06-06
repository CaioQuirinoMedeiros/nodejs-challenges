import { FastifyInstance } from 'fastify'

import { registerOrgController } from './register-org-controller'
import { authenticateOrgController } from './authenticate-org-controller'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrgController)
  app.post('/orgs/sessions', authenticateOrgController)
}
