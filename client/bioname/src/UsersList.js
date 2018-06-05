import React from "react";


export const UsersList = (props) => {
        console.log("UsersListPROPS", props)
        return(
            <div>
            <h1>Names and Quick Bios of Famous People</h1>
            <table className="bioname-list">
                <tbody>
                    {props.data.map(element =>{
                    return(
                        <tr className="bio-table" key={element.name}>
                            <td className="naming">{element.name}</td>
                            <td className="bioing">{element.bio}</td>
                            <button className='remove-button' onClick={this.handleDeletedUser}>Remove</button>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
            </div>
        )
        
    }


    