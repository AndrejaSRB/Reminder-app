import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

const CustomCheckbox = withStyles({
    root: {
      color: '#344955',
      '&$checked': {
        color: '#344955',
      },
    },
    checked: {},
  })(props => <Checkbox color="default" {...props} />);

  export default CustomCheckbox;