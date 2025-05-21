
import { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import EntryForm from '@/components/Journal/EntryForm';

const JournalPage = () => {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">New Journal Entry</h1>
        <EntryForm />
      </div>
    </MainLayout>
  );
};

export default JournalPage;
