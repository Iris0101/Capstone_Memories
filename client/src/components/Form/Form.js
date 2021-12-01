import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';


// get the current id of the post we are on for editing and updating

const Form = ({ currentId, setCurrentId }) => {
    // initialize the postData state as an object
    // postData.creator will store data in postData
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' })
    const classes = useStyles();
    const dispatch = useDispatch();
    // get data for the post needed to be updated
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

    // when post change, run useEffect
    useEffect(() => {
        // post exist, populate old data on browser
        if (post) setPostData(post);
    }, [post])
    
    // function to handle submit
    // once user submit, we send over a post request with all the data user typed in
    const handleSubmit = (e) => {
        // not get refresh in browser
        e.preventDefault();

        // currentId is not null
        if (currentId) {
            dispatch(updatePost(currentId, postData));
        }
        else {
            // a new post, not updating it
            dispatch(createPost(postData));
        }
        clear();
    }

    const clear = () => {
        // reset currentId
        setCurrentId(null);
        // set all fields to empty lines
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    }
    
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{ currentId ? 'Editing' : 'Creating' } a Memory</Typography>
            <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
            <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
            <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
            <div className={classes.fileInput}>
                <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}  />
            </div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;