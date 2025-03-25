import React from 'react';
import { PlayCircle, CheckSquare, Square } from 'lucide-react';
import { useProgressStore } from '../store/progressStore';

interface Exercise {
  name: string;
  sets: string;
  videoUrl?: string;
}

interface Meal {
  time: string;
  name: string;
  portions: string;
}

interface WorkoutDayProps {
  id: string;
  day: string;
  focus: string;
  data: {
    exercises: Exercise[];
    meals: Meal[];
  };
}

const WorkoutDay: React.FC<WorkoutDayProps> = ({ id, day, focus, data }) => {
  const { completedExercises, completedMeals, toggleExercise, toggleMeal } = useProgressStore();

  const getExerciseId = (dayId: string, index: number) => `${dayId}-exercise-${index}`;
  const getMealId = (dayId: string, index: number) => `${dayId}-meal-${index}`;

  const exerciseProgress = data.exercises.reduce((acc, _, index) => {
    return acc + (completedExercises.has(getExerciseId(id, index)) ? 1 : 0);
  }, 0);

  const mealProgress = data.meals.reduce((acc, _, index) => {
    return acc + (completedMeals.has(getMealId(id, index)) ? 1 : 0);
  }, 0);

  const exercisePercentage = (exerciseProgress / data.exercises.length) * 100;
  const mealPercentage = (mealProgress / data.meals.length) * 100;

  return (
    <section id={id} className="scroll-mt-20">
      <div className="bg-gray-800 rounded-2xl p-6 md:p-8">
        <h2 className="text-3xl font-bold mb-2">{day}</h2>
        <p className="text-xl text-gray-400 mb-8">{focus}</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Workout Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold flex items-center">
                <span className="bg-red-500 w-2 h-8 rounded mr-3"></span>
                Entrenamiento
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">
                  {exerciseProgress} de {data.exercises.length}
                </span>
                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-300"
                    style={{ width: `${exercisePercentage}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {data.exercises.map((exercise, index) => {
                const exerciseId = getExerciseId(id, index);
                const isCompleted = completedExercises.has(exerciseId);

                return (
                  <div
                    key={index}
                    className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <button
                          onClick={() => toggleExercise(exerciseId)}
                          className="text-gray-300 hover:text-white transition-colors"
                          title={isCompleted ? "Marcar como incompleto" : "Marcar como completado"}
                        >
                          {isCompleted ? (
                            <CheckSquare className="h-6 w-6 text-green-500" />
                          ) : (
                            <Square className="h-6 w-6" />
                          )}
                        </button>
                        <div>
                          <h4 className="font-medium">{exercise.name}</h4>
                          <p className="text-gray-400 text-sm">{exercise.sets}</p>
                        </div>
                      </div>
                      {exercise.videoUrl && (
                        <a
                          href={exercise.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300"
                          title="Ver técnica correcta"
                        >
                          <PlayCircle size={24} />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Nutrition Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold flex items-center">
                <span className="bg-blue-500 w-2 h-8 rounded mr-3"></span>
                Nutrición
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">
                  {mealProgress} de {data.meals.length}
                </span>
                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300"
                    style={{ width: `${mealPercentage}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {data.meals.map((meal, index) => {
                const mealId = getMealId(id, index);
                const isCompleted = completedMeals.has(mealId);

                return (
                  <div
                    key={index}
                    className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleMeal(mealId)}
                        className="text-gray-300 hover:text-white transition-colors"
                        title={isCompleted ? "Marcar como incompleto" : "Marcar como completado"}
                      >
                        {isCompleted ? (
                          <CheckSquare className="h-6 w-6 text-green-500" />
                        ) : (
                          <Square className="h-6 w-6" />
                        )}
                      </button>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-400">{meal.time}</span>
                        <h4 className="font-medium">{meal.name}</h4>
                        <p className="text-gray-400 text-sm">{meal.portions}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkoutDay;