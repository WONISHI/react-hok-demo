import React from "react";
import { Tag, Space } from "antd";
import { useSelector,useDispatch } from "react-redux";
import {closeTag,setcurrentTag} from '../../store/reduces/tag'
import { useNavigate } from "react-router-dom";
import { CloseCircleOutlined } from "@ant-design/icons";

import "./index.css";
export default function CommonTag() {
  const tabsList = useSelector((state: any) => state.tag.routes);
  const location=useSelector((state:any)=>state.tag.commonTag)
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const routeDelete=(data:any)=>{
    let index = tabsList.findIndex((item: any) => item.name === data.name);
    if(tabsList.length===index+1){
        dispatch(setcurrentTag(tabsList[tabsList.length-2]))
        navigate(tabsList[tabsList.length-2].path)
    }else if(index>0 && index<tabsList.length-1){
        dispatch(setcurrentTag(tabsList[index-1]))
        navigate(tabsList[index-1].path)
    }
    dispatch(closeTag(data))
  }
  const navigateRoute=(item:any)=>{
    dispatch(setcurrentTag(item))
    navigate(item.path)
  }
  return (
    <div>
      <Space size={[0, 8]} className="common-tag">
        {tabsList.map((item: any) => {
          if (item.path === location.path) {
            return (
              <Tag closeIcon={<CloseCircleOutlined />} onClose={()=>routeDelete(item)} color="#55acee" key={item.name}>
                {item.label}
              </Tag>
            );
          } else {
            return <Tag key={item.name} onClick={()=>navigateRoute(item)}>{item.label}</Tag>;
          }
        })}
      </Space>
    </div>
  );
}
