// @ts-nocheck
import React, { useEffect, useState } from "react"


export const fetchChallenge = async (id) => {
    const endpoint = `/get-quiz/${id}`;
    const data = await (await fetch(endpoint)).json();
    return data
}