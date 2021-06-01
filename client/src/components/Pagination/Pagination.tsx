import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {Pagination, PaginationItem} from "@material-ui/lab";
import useStyles from "./styles";
import {useDispatch, useSelector} from "react-redux";
import {Services} from "../../services/Services";
import {RootReducerState} from "../../redux/reducers";

const Paginate=({page}:any)=>{
    const styleClasses = useStyles();
    const dispatch = useDispatch();

    const {totalPages} : any = useSelector((state:RootReducerState)=>state.postsReducer);

    useEffect(()=>{
        if(page) dispatch(Services.getPosts(page))
    }, [page]);

    return(
        <Pagination
            classes={{ul: styleClasses.ul}}
            count={totalPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item)=>(
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    )
}

export default Paginate;