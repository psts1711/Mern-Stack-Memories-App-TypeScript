import React, {useEffect, useState} from "react";
import {Button, Container, Grid, Grow,} from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import {useDispatch} from "react-redux";
import {Services} from "../../services/Services";


const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(Services.getPosts());
    }, [currentId, dispatch]);

    return(
        <>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </>

    )
};

export default Home;
