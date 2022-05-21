// @ts-nocheck
import React, { useEffect,useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserAuth } from '../Context/AuthContext'
import Signin from "../SignIn/SignIn";
import { UserContext } from "../Context/UserContext";

//users must sign in
//Then they can pick a trivia category

const HomePage = () =>{
    const { user } = UserAuth();
    const {dataExported, setDataExported} = useContext(UserContext);
    
    const navigate = useNavigate()


    //check if user exists and create one if they aren't the database
    useEffect(() => {
        //googleauth provides the user 
        //and don't refetch if the user navs to the home page again
        if (user != null && dataExported=== false) {
        
          //user data payload
            let data = {
            _id: user.uid,
            challenges: [],
            email: user.email,
            wins:0,
            losses:0,
            quizzes:[]
            };

        fetch('/add-user', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
            if (!res.status ==='200') {
            throw Error("Server Error");
            }
        //prevents refetch
        setDataExported(true)
        
        return res.json();
        })
        .then(data => console.log(data.message))
        }
    }, [user]);
    //functions
    //Navigate to the trivia page based on the category chosen
    //The button id is passed as state to the next page 
    //in order to fetch the correct category fromm the api
    function handleCategoryNav(event:any) {
        event.stopPropagation();
        event.preventDefault()
        navigate("/trivia", {state : event.currentTarget.id})
    }


    //conditionally render sign in prompt
return(
    <Wrapper>
        <Content>
            
            {user?.displayName ? 
            <>
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
                    </>:
            <Signin></Signin>}
        </Content>
    </Wrapper>
)


}

const Wrapper = styled.div`
grid-row: 2;
overflow-y: auto;
background-color:black;
`;

const Content = styled.div`
display:flex;
flex-direction:column;
align-items:center;
text-align:center;
`;

const Prompt = styled.div`
    font-size:20px;
    height:10vw;
    width:80vw;
    color:white;
    margin: 5vh 0;
`;

//add media query
const Button = styled.button`
    font-size:1.7em;
    height:20vw;
    width:40vw;
    background-color:black;
    color:#DF740C;
    cursor:pointer;
    text-decoration:none;
    margin-bottom: 5vh;
    border: #DF740C 0.05em solid;
    border-radius: 0.25em;
    &:hover, :focus{
    outline:0;
    text-decoration:none;
    border: #DF740C 0.125em solid;
    text-shadow: 
    0 0 0.125em hsla(0,0%,100%,0.5),
    0 0 0.45em#DF740C;
    box-shadow:
    0 0 0.4em 0 #DF740C,
    inset 0 0 0.4em 0 #DF740C;
    position:relative;
    &:before{
        content:'';
        position:absolute;
        background: #DF740C;
        height:20%;
        width:100%;
        top:120%;
        left:0;
        transform: perspective(1em) rotateX(40deg);
        filter: blur(0.3em);
        opacity:0.7;
    }
    }
    
`;

export default HomePage