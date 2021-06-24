import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Test1.css'

function Test1()
{
    const [data, setdata] = useState([])
    const [show , setshow] = useState([])
    const [arrow, setarrow] = useState([])
    useEffect( () => {
        axios.get("https://api.npoint.io/93bed93a99df4c91044e")
        .then(res => {
            console.log(res.data.body.Recommendations)
            setdata(res.data.body.Recommendations)
            
        })
        .catch(err => 
            {
                return err.meassage
            })
    },[])
    
    const showItem = (id) => {
        const showstate = show.slice();
        const showarrow = arrow.slice();
        const index = showstate.indexOf(id)
        const index1 = showarrow.indexOf(id)

        if(index >=0 )
        {
            showstate.splice(index,1);
            setshow(showstate)
        }
        else{
            showstate.push(id)
            setshow(showstate)
        }

        if(index1 >=0 )
        {
            showarrow.splice(index1,1);
            setarrow(showarrow)
        }
        else{
            showarrow.push(id)
            setarrow(showarrow)
        }
    }


    
    return (
        <div className="mt-5">
        {
            data.map((post) => {
                return (    
                    <div>
                        <div className="set mb-3">
                            <button className="mr-2" onClick={() =>showItem(post.RestaurantID)}>{
                                arrow.includes(post.RestaurantID) ? <i className="fas fa-caret-down"></i> : <i className="fas fa-caret-right"></i> 
                            }</button>
                            <p className="mb-0">{post.RestaurantName}</p> 
                        </div>
                        
                        {
                            show.includes(post.RestaurantID) && post.menu.map((menu) =>{
                                if(menu.type == "sectionheader")
                                {
                                    return (
                                        <div>
                                            <div className="set mb-3 ml-3">
                                                <button className="mr-2" onClick={() =>showItem(menu.id)}>{ arrow.includes(menu.id) ? <i className="fas fa-caret-down"></i> : <i className="fas fa-caret-right"></i> }</button>
                                                <p>{menu.name}</p>
                                            </div>
                                            {
                                                show.includes(menu.id) &&  menu.children.map((child) => 
                                                {
                                                    if(child.type=="item" && child.selected == 1)
                                                    {
                                                        return (
                                                            <div>
                                                                <div className="set mb-3 ml-5">
                                                                    <button className="mr-2" onClick={() =>showItem(child.id)}>{ arrow.includes(child.id) ? <i className="fas fa-caret-down"></i> : <i className="fas fa-caret-right"></i> }</button>
                                                                    <p>{child.name}</p>
                                                                </div>

                                                                {
                                                                    show.includes(child.id) &&  child.children.map((child1) =>{
                                                                        if(child1.selected == 1)
                                                                        { 
                                                                            return (
                                                                            <div>
                                                                                <div className="set mb-3 ml-5 pl-2">
                                                                                    <button className="mr-2" onClick={() =>showItem(child1.id)}>{ arrow.includes(child1.id) ? <i className="fas fa-caret-down"></i> : <i className="fas fa-caret-right"></i> }</button>
                                                                                    <p>{child1.name}</p>
                                                                                </div>
                                                                                {
                                                                                    show.includes(child1.id) &&  child1.children.map((child2) => {
                                                                                        if(child2.selected ==1) {
                                                                                            return <p className="ml-5 pl-5">{child2.name}</p>
                                                                                        }
                                                                                    })
                                                                                }
                                                                            </div>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                                
                                                            </div>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                        
                                    )
                                }})
                        }
                    </div>
                )
            })
        }
    </div>
    )
}
export default Test1



                                        