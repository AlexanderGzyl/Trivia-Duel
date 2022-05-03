// @ts-nocheck
import React, { useEffect, useState } from "react"
import { shuffleArray } from "./TriviaUtils";

export const fetchQuizQuestions = async (category) => {
    const endpoint = `https://the-trivia-api.com/api/questions?categories=${category}&limit=5`
    const data = await (await fetch(endpoint)).json();
    return data.map((question)=>(
        {
            ...question,
            answer:shuffleArray([...question.incorrectAnswers,question.correctAnswer])
        }
    ))
}