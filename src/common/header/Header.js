import React, { Component, useState } from "react";
import Button from "@material-ui/core/Button";
import './Header.css';
import LoginRegister from '../LoginRegister/LoginRegister.js';

function Header() {
    const [isDetailsPage, setBookShowBtnState] = useState(false);

    const bookShowbtn = (<Button variant="contained" color='primary'>Book Show</Button>);
    const noshowbtn = (<p></p>);

    const mainHeader = (<div id='headprops'>
            <table className='tableprops'>
                <tbody>
                    <tr className='tableprops'>
                        <th className='rowprops2'>
                            <div id='logoattribs'></div>
                        </th>
                        <th className='rowprops1'>
                        </th>
                        <th className='rowprops2'>
                            { isDetailsPage?bookShowbtn:noshowbtn }
                        </th>
                        <th className='rowprops2'>
                            <LoginRegister />
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    );

    return mainHeader;
}

export default Header;