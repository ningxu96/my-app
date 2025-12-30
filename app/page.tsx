"use client";

import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import ExamList from "@/features/exam/ExamList";

export default function HomePage() {
  return (
    <AppLayout>
      <ExamList />
    </AppLayout>
  );
}