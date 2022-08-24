import React from 'react';
import ReactDOM from 'react-dom';
import Button from "@material-ui/core/Button";
import './Header.css';

function Header(){
    var mainHeader = (<div id='headprops'>
    <table class='tableprops'>
        <tr class='tableprops'>
            <th class='rowprops2'>
                <div id='logoattribs'></div>
            </th>
            <th class='rowprops1'>
            </th>
            <th class='rowprops2'>
                <Button variant="contained" color='primary'>Book Show</Button>
            </th>
            <th class='rowprops2'>
                <Button variant="contained" color='default'>Login</Button>
            </th>
        </tr>
    </table>
</div>);
    return mainHeader;
}

export default Header;