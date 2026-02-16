// Migration script to add aboutImage field to Settings
// Run once: node scripts/migrate-settings.js

const mongoose = require('mongoose');

// Use actual MongoDB URI from .env.local
const MONGODB_URI = 'mongodb://localhost:27017/aurora';

async function migrate() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;
    const settingsCollection = db.collection('settings');

    // Find Settings document
    const settings = await settingsCollection.findOne({});

    if (!settings) {
      console.log('❌ No settings document found!');
      process.exit(1);
    }

    console.log('📄 Found settings document:', settings._id);

    // Check if aboutImage exists
    if (settings.aboutImage !== undefined) {
      console.log('✅ aboutImage field already exists:', settings.aboutImage);
      await mongoose.disconnect();
      return;
    }

    // Add aboutImage field
    console.log('🔧 Adding aboutImage field...');
    const result = await settingsCollection.updateOne(
      { _id: settings._id },
      {
        $set: {
          aboutImage: '',
          updatedAt: new Date(),
        },
      }
    );

    console.log('✅ Migration successful!');
    console.log('   Modified count:', result.modifiedCount);

    // Verify
    const updated = await settingsCollection.findOne({ _id: settings._id });
    console.log('📋 Updated document fields:');
    console.log('   aboutImage:', updated.aboutImage || '(empty string)');
    console.log('   logoUrl:', updated.logoUrl);

    await mongoose.disconnect();
    console.log('\n✅ Migration complete! Please restart the dev server.');
  } catch (error) {
    console.error('❌ Migration error:', error.message);
    process.exit(1);
  }
}

migrate();
