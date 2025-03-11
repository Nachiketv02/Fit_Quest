import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown, FiClock, FiZap , FiInfo } from 'react-icons/fi';

function MealPlan() {
  const [activeDay, setActiveDay] = useState('monday');
  const [selectedMeal, setSelectedMeal] = useState(null);

  const mealPlans = {
    monday: [
      {
        type: 'Breakfast',
        time: '7:00 AM',
        calories: 450,
        meals: [
          {
            name: 'Protein Oatmeal Bowl',
            ingredients: [
              'Rolled oats (1 cup)',
              'Protein powder (1 scoop)',
              'Banana (1 medium)',
              'Almond milk (1 cup)',
              'Chia seeds (1 tbsp)',
              'Mixed berries (1/2 cup)',
              'Honey (1 tsp)'
            ],
            macros: {
              protein: '25g',
              carbs: '65g',
              fats: '12g'
            },
            instructions: 'Cook oats with almond milk, stir in protein powder, top with fruits and seeds'
          }
        ]
      },
      {
        type: 'Mid-Morning Snack',
        time: '10:00 AM',
        calories: 200,
        meals: [
          {
            name: 'Greek Yogurt Parfait',
            ingredients: [
              'Greek yogurt (1 cup)',
              'Granola (1/4 cup)',
              'Mixed berries (1/2 cup)',
              'Honey (1 tsp)'
            ],
            macros: {
              protein: '18g',
              carbs: '25g',
              fats: '6g'
            },
            instructions: 'Layer yogurt, granola, and berries in a bowl'
          }
        ]
      },
      {
        type: 'Lunch',
        time: '1:00 PM',
        calories: 550,
        meals: [
          {
            name: 'Grilled Chicken Quinoa Bowl',
            ingredients: [
              'Grilled chicken breast (6 oz)',
              'Quinoa (1 cup cooked)',
              'Mixed vegetables (2 cups)',
              'Avocado (1/4)',
              'Olive oil (1 tbsp)',
              'Lemon juice (1 tbsp)'
            ],
            macros: {
              protein: '40g',
              carbs: '45g',
              fats: '22g'
            },
            instructions: 'Combine quinoa, grilled chicken, and vegetables. Top with avocado and dressing'
          }
        ]
      },
      {
        type: 'Afternoon Snack',
        time: '4:00 PM',
        calories: 250,
        meals: [
          {
            name: 'Pre-Workout Energy Mix',
            ingredients: [
              'Apple (1 medium)',
              'Almonds (1 oz)',
              'Rice cakes (2)',
              'Almond butter (1 tbsp)'
            ],
            macros: {
              protein: '8g',
              carbs: '30g',
              fats: '14g'
            },
            instructions: 'Spread almond butter on rice cakes, enjoy with apple and almonds'
          }
        ]
      },
      {
        type: 'Dinner',
        time: '7:00 PM',
        calories: 600,
        meals: [
          {
            name: 'Salmon with Sweet Potato',
            ingredients: [
              'Wild salmon fillet (6 oz)',
              'Sweet potato (1 medium)',
              'Asparagus (1 cup)',
              'Olive oil (1 tbsp)',
              'Herbs and seasonings'
            ],
            macros: {
              protein: '42g',
              carbs: '40g',
              fats: '28g'
            },
            instructions: 'Bake salmon and sweet potato, steam asparagus, season to taste'
          }
        ]
      }
    ]
  };

  const days = [
    { id: 'monday', name: 'Monday' },
    { id: 'tuesday', name: 'Tuesday' },
    { id: 'wednesday', name: 'Wednesday' },
    { id: 'thursday', name: 'Thursday' },
    { id: 'friday', name: 'Friday' },
    { id: 'saturday', name: 'Saturday' },
    { id: 'sunday', name: 'Sunday' }
  ];

  const handleMealClick = (meal) => {
    setSelectedMeal(selectedMeal === meal ? null : meal);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <section className="bg-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Your Elite Meal Plan</h1>
            <p className="text-xl opacity-90">Personalized nutrition to fuel your performance</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Day Selection */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-7 gap-2">
            {days.map((day) => (
              <button
                key={day.id}
                onClick={() => setActiveDay(day.id)}
                className={`p-4 rounded-lg text-center transition-colors ${
                  activeDay === day.id
                    ? 'bg-purple-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <span className="block text-sm font-medium">{day.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Nutritional Summary */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Daily Nutrition Goals</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiZap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-2xl mb-1">2,200</h3>
              <p className="text-gray-600">Calories</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">P</span>
              </div>
              <h3 className="font-bold text-2xl mb-1">180g</h3>
              <p className="text-gray-600">Protein</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold">C</span>
              </div>
              <h3 className="font-bold text-2xl mb-1">220g</h3>
              <p className="text-gray-600">Carbs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-yellow-600 font-bold">F</span>
              </div>
              <h3 className="font-bold text-2xl mb-1">70g</h3>
              <p className="text-gray-600">Fats</p>
            </div>
          </div>
        </div>

        {/* Meal Schedule */}
        <div className="space-y-6">
          {mealPlans[activeDay]?.map((meal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => handleMealClick(meal)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{meal.type}</h3>
                    <div className="flex items-center gap-4 mt-2 text-gray-600">
                      <div className="flex items-center">
                        <FiClock className="mr-1" />
                        {meal.time}
                      </div>
                      <div className="flex items-center">
                        <FiZap className="mr-1" />
                        {meal.calories} cal
                      </div>
                    </div>
                  </div>
                  <FiChevronDown
                    className={`transform transition-transform ${
                      selectedMeal === meal ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>

              {selectedMeal === meal && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-200 p-6"
                >
                  {meal.meals.map((item, mealIndex) => (
                    <div key={mealIndex}>
                      <h4 className="font-bold text-lg mb-4">{item.name}</h4>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-medium mb-2">Ingredients</h5>
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            {item.ingredients.map((ingredient, i) => (
                              <li key={i}>{ingredient}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-medium mb-2">Macronutrients</h5>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span>Protein</span>
                              <span className="font-medium">{item.macros.protein}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Carbs</span>
                              <span className="font-medium">{item.macros.carbs}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Fats</span>
                              <span className="font-medium">{item.macros.fats}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h5 className="font-medium mb-2">Instructions</h5>
                        <p className="text-gray-600">{item.instructions}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Nutrition Tips */}
        <div className="mt-12 bg-purple-50 rounded-xl p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <FiInfo className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-bold text-lg mb-2">Nutrition Tips</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Drink water 30 minutes before each meal</li>
                <li>Eat slowly and mindfully to improve digestion</li>
                <li>Adjust portions based on your activity level</li>
                <li>Prep meals in advance for better adherence</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealPlan;