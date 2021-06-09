import React from "react";
import { body1} from '@sberdevices/plasma-tokens';
import { TextBox }  from '@sberdevices/plasma-ui';

export const Answer = (props) => {
    const {item} = props;
    return (   
      <TextBox classname = "find"
         style = {body1}
         size="m"
         title={item}
      />
    )
  }
  
  
  