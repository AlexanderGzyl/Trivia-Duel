// @ts-nocheck
import React, { useEffect, useState } from "react"


export const fetchChallenge = async (id) => {
    console.log(typeof id)
    const endpoint = `/get-quiz/${id}`;
    const data = await (await fetch(endpoint)).json();
    return data
}