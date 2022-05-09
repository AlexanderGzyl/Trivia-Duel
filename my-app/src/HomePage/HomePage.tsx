// @ts-nocheck
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//to do
//add names and keyboard nav too buttons
const HomePage = () =>{

    const navigate = useNavigate()

    //Handlers
    //Navigate to the trivia page based on the category chosen
    //The button id is passed as state to the next page 
    //in order to fetch the correct category fromm the api
    function handleCategoryNav(event:any) {
        event.stopPropagation();
        event.preventDefault()
        navigate("/Trivia", {state : event.currentTarget.id})
    }
    //conditionally render sign in prompt

return(
    <Wrapper>
        <Content>
            <Logo>banner/img/logo</Logo>
            <Prompt>Select a category</Prompt>
            <Button id = "history"
                    tabIndex="0"
                    aria-label="History Category"
                    type="button"  
                    onClick={ (event)=>handleCategoryNav(event)}>History</Button>
            <Button id = "music"
                    aria-label="Music Category"
                    type="button"    
                    onClick={ (event)=>handleCategoryNav(event)}>Music</Button>
            <Button id = "film_and_tv"
                    aria-label="Film Category"
                    type="button"    
                    onClick={ (event)=>handleCategoryNav(event)}>Film</Button>
            <Button id = "society_and_culture"
                    aria-label="Culture Category" 
                    type="button"   
                    onClick={ (event)=>handleCategoryNav(event)}>Culture</Button>
        </Content>
    </Wrapper>
)


}

const Wrapper = styled.div`
grid-row: 2;
overflow-y: auto;
`;

const Content = styled.div`
display:flex;
flex-direction:column;
align-items:center;
text-align:center;
`;
const Logo = styled.div`
    height:10vw;
    width:80vw;
   
    margin:2% 0% 5% 0%;
`;
const Prompt = styled.div`
    font-size:20px;
    height:10vw;
    width:80vw;
    
    margin-bottom: 15%;
`;

//add media query
const Button = styled.button`
@media (max-width: 768px){
    height:20vw;
    width:80vw;
    margin-bottom: 2%;
    }
    font-size:30px;
    height:20vw;
    width:50vw;
    
    margin-bottom: 2%;
`;

export default HomePage