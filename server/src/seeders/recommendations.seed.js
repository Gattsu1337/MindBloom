const Recommendation = require('../models/recommendation.model');
const { sequelize } = require('../config/database');

const recommendations = [
  {
    mood: "Anxious",
    type: "Quote",
    content: "Peace is the result of retraining your mind to process life as it is, rather than as you think it should be. - Wayne Dyer"
  },
  {
    mood: "Sad",
    type: "Quote",
    content: "Even the darkest night will end and the sun will rise. - Victor Hugo"
  },
  {
    mood: "Stressed",
    type: "Quote",
    content: "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela"
  },
  
  {
    mood: "Anxious",
    type: "Advice",
    content: "Try the 5-4-3-2-1 grounding technique: Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste."
  },
  {
    mood: "Sad",
    type: "Advice",
    content: "Reach out to a friend or family member. Sometimes sharing your feelings with someone who cares about you can help lift your spirits and provide a fresh perspective."
  },
  {
    mood: "Stressed",
    type: "Advice",
    content: "Take a moment to prioritize your tasks. Break them down into smaller, manageable steps and focus on one thing at a time."
  },
  
  {
    mood: "Anxious",
    type: "Exercise",
    content: "Box Breathing Exercise: Inhale for 4 counts, hold for 4 counts, exhale for 4 counts, hold for 4 counts. Repeat this pattern for 5 minutes."
  },
  {
    mood: "Sad",
    type: "Exercise",
    content: "Gratitude List: Write down 3 things you're grateful for right now, no matter how small they might seem. Then write one sentence about why each thing matters to you."
  },
  {
    mood: "Stressed",
    type: "Exercise",
    content: "Progressive Muscle Relaxation: Starting from your toes and moving up to your head, tense each muscle group for 5 seconds, then release and relax for 10 seconds."
  },
  
  {
    mood: "Overwhelmed",
    type: "Quote",
    content: "You don't have to see the whole staircase, just take the first step. - Martin Luther King Jr."
  },
  {
    mood: "Overwhelmed",
    type: "Advice",
    content: "Choose one small task to focus on. Completing even a minor task can help you regain a sense of control and accomplishment."
  },
  {
    mood: "Overwhelmed",
    type: "Exercise",
    content: "Mind Dump Exercise: Take 5 minutes to write down everything that's on your mind without judging or organizing. Then circle the three most important items to focus on first."
  }
];

async function seedRecommendations() {
  try {
    await sequelize.sync();

    await Recommendation.destroy({ truncate: true });

    await Recommendation.bulkCreate(recommendations);

    console.log('Recommendations seeded successfully!');
  } catch (error) {
    console.error('Error seeding recommendations:', error);
  }
}

if (require.main === module) {
  seedRecommendations()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = seedRecommendations; 