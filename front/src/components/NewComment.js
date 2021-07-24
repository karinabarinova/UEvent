import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useTranslation } from "react-i18next";
import { useUser } from './User'
import useForm from '../lib/useForm';
import { useDispatch } from 'react-redux';
import { addComment } from '../store/products/productSlice';

export default function NewComment({id}) {
    const { t } = useTranslation('common')
	const dispatch = useDispatch();
    const me = useUser();

    const { inputs, handleChange, clearForm } = useForm({
    	comment: ''
	});

	function submitComment() {
		if (inputs.comment.length) {
			dispatch(addComment({id, comment: inputs.comment}));
			clearForm();
		}
	}

    return (
      <>
        {me?.user?.email && (
          <div>
            <FormControl style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', 
justifyContent: "space-between"}}>
            	<InputLabel htmlFor="comment" style={{fontSize: 20, width: '70%'}}>{t('ADD_COMMENT')}</InputLabel>
            	<Input
            	  	style={{height: 60, fontSize: 20, width: '75%'}}
            	  	id="comment"
            	  	startAdornment={
            	  		<InputAdornment position="start">
            	  		  <AccountCircle  style={{fontSize: 30, color: 'red'}}/>
            	  		</InputAdornment>
            	  	}
					name='comment'
					value={inputs.comment}
					onChange={handleChange}
            	  	label="Add a comment"
            	  	multiline
            	  	rowsMax={3}
            	/>
				<button 
					type="submit" 
					onClick={submitComment} 
					style={{
						width: 'auto',
    					background: 'rgba(255, 0, 0, 0.6)',
    					color: 'white',
    					border: 0,
    					fontSize: '2rem',
    					fontWeight: 600,
    					padding: "0.5rem 1.8rem",
						borderRadius: '5px',
					}}
				>🖊️</button>
            </FormControl>
          </div>
        )}
      </>
    );
}