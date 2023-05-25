import { FastifyInstance } from 'fastify'

import { MealsController } from '../controllers/MealsController'
import { checkUserAuthenticated } from '../middlewares/checkUserAuthenticated'

const mealsController = new MealsController()

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', { preHandler: checkUserAuthenticated }, mealsController.createMeal)
  app.put('/:mealId', { preHandler: checkUserAuthenticated }, mealsController.editMeal)
  app.delete('/:mealId', { preHandler: checkUserAuthenticated }, mealsController.deleteMeal)
  app.get('/', { preHandler: checkUserAuthenticated }, mealsController.getMeals)
  app.get('/:mealId', { preHandler: checkUserAuthenticated }, mealsController.getMeal)
  app.get('/dashboard', { preHandler: checkUserAuthenticated }, mealsController.getMealsDashboard)
}
