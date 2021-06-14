import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useTranslation } from "react-i18next";

export default function NewComment() {
    const { t } = useTranslation('common')

    return (
      <div>
        <FormControl fullWidth>
          <InputLabel htmlFor="input-with-icon-adornment" style={{fontSize: 20}}>{t('ADD_COMMENT')}</InputLabel>
          <Input
              style={{height: 60, fontSize: 20}}
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle  style={{fontSize: 30, color: 'red'}}/>
                </InputAdornment>
              }
              label="Add a comment"
              multiline
              rowsMax={3}
          />
        </FormControl>
      </div>
    );
}