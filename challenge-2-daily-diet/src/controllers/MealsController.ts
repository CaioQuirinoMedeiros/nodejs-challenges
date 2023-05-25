import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { string, z } from 'zod'
import { AppError } from '../errors/AppError'

const prisma = new PrismaClient()

const createMealBodySchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  madeAt: z.string().datetime(),
  diet: z.boolean()
})

const editMealBodySchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  madeAt: z.string().datetime(),
  diet: z.boolean()
})

const editMealParamsSchema = z.object({
  mealId: z.string()
})

const deleteMealParamsSchema = z.object({
  mealId: z.string()
})

const getMealParamsSchema = z.object({
  mealId: z.string()
})

export class MealsController {
  async createMeal(request: FastifyRequest, reply: FastifyReply) {
    const { description, diet, madeAt, name } = createMealBodySchema.parse(
      request.body
    )

    const meal = await prisma.meal.create({
      data: { name, description, diet, madeAt, userId: request.userId }
    })

    return reply.send({ meal })
  }

  async editMeal(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.userId
    const { mealId } = editMealParamsSchema.parse(request.params)
    const { description, diet, madeAt, name } = editMealBodySchema.parse(
      request.body
    )

    let meal = await prisma.meal.findFirst({
      where: { id: mealId, userId: userId }
    })

    if (!meal) {
      throw new AppError({ statusCode: 404, message: 'Meal not found' })
    }

    meal = await prisma.meal.update({
      where: { id: meal.id },
      data: { name, description, diet, madeAt }
    })

    return reply.send({ meal })
  }

  async deleteMeal(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.userId
    const { mealId } = deleteMealParamsSchema.parse(request.params)

    const meal = await prisma.meal.findFirst({
      where: { id: mealId, userId: userId }
    })

    if (!meal) {
      throw new AppError({ statusCode: 404, message: 'Meal not found' })
    }

    await prisma.meal.delete({
      where: { id: meal.id }
    })

    return reply.status(204).send()
  }

  async getMeals(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.userId
    const meals = await prisma.meal.findMany({
      where: { userId: userId }
    })

    return reply.send({ meals })
  }

  async getMeal(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.userId
    const { mealId } = getMealParamsSchema.parse(request.params)

    const meal = await prisma.meal.findFirst({
      where: { id: mealId, userId: userId }
    })

    if (!meal) {
      throw new AppError({ statusCode: 404, message: 'Meal not found' })
    }

    return reply.send({ meal })
  }

  async getMealsDashboard(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.userId

    const meals = await prisma.meal.findMany({
      where: { userId: userId },
      orderBy: { madeAt: 'asc' }
    })

    const totalMeals = meals.length
    let mealsOnDiet = 0
    let mealsOffDiet = 0
    let sequenceMealsOnDieat = 0

    meals.forEach((meal) => {
      if (meal.diet) {
        mealsOnDiet++
        sequenceMealsOnDieat++
      } else {
        mealsOffDiet++
        sequenceMealsOnDieat = 0
      }
    })

    return reply.send({
      totalMeals,
      mealsOnDiet,
      mealsOffDiet,
      sequenceMealsOnDieat
    })
  }
}
