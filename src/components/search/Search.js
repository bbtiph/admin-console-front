/***********************/
/* THIRD-PARTY IMPORTS */
/***********************/

import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

/*******************/
/* PROJECT IMPORTS */
/*******************/

/* Styles */
import '../style/search.css';

/* Components */
import Modal from "../../Common/Modal/modal";

/*****************************************************************************/

function Search(props2) {
  const [isOpenModalSetParam, setIsOpenModalSetParam] = useState(false);
  const [isFieldForSearch, setIsFieldForSearch] = useState(props2.fields[0]);
  const [isTextForSearch, setIsTextForSearch] = useState("");


  const options = [];

  let isField;

  props2.fields.map((field, i) => {
    let option = { value: field, label: field };
    options.push(option);
  })

  return (
    <div className="container-fluid" id="search-box">
      <form>
        <div className="input-group mb-3">
          <input placeholder="Поиск..." type="text" className="form-control"
            value={isTextForSearch}
            onChange={(e) => setIsTextForSearch(e.target.value)} />
          <div className="input-group-append">
            <button type="button" className="btn"
              onClick={() => {
                props2.searchFunction({
                  isTextForSearch: isTextForSearch,
                  isFieldForSearch: isFieldForSearch
                })
                props2.onChangePage({
                  pageNumber: 1,
                  input: isTextForSearch,
                  field: isFieldForSearch
                })
              }}>
              Поиск
            </button>
          </div>
        </div>
        <div className="function-group mb-3">
          <div className="searchActions">
            <button type="button" className="btn" id="discharge" onClick={() => {
              setIsFieldForSearch("")
              setIsTextForSearch("")
            }}>Сбросить</button>
            <button type="button" className="btn" id="apply" onClick={() => {
              setIsFieldForSearch(isField ? isField : isFieldForSearch);
            }}>Применить</button>
            <select className="form-control" id="userRoles" onChange={(e) => {
              isField = e.target.value
            }}>
              {
                options.map((option, i) => (
                  <option>
                    {option.label}
                  </option>
                ))
              }
            </select>
          </div>
          {/*<a href="#" onClick={() => setIsOpenModalSetParam(true)}>Фильтр по критериям <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
          {/*    <path d="M9.65167 5.14294H8.81461C8.75769 5.14294 8.70412 5.17085 8.67064 5.21661L5.49988 9.58714L2.32912 5.21661C2.29564 5.17085 2.24207 5.14294 2.18515 5.14294H1.34809C1.27555 5.14294 1.23314 5.22553 1.27555 5.28469L5.21082 10.7099C5.35367 10.9063 5.64608 10.9063 5.78783 10.7099L9.72309 5.28469C9.76662 5.22553 9.72421 5.14294 9.65167 5.14294Z" fill="#1890FF"/>*/}
          {/*</svg>*/}
          {/*</a>*/}
        </div>
      </form>
      {
        isOpenModalSetParam ? (
          <Modal size="small" center="center" close={() => {
            setIsOpenModalSetParam(false);
          }}
            style={{ padding: '0px' }} title="Settings">
            <select className="form-control" id="userRoles">
              {
                options.map((option, i) => (
                  <option>
                    {option.label}
                  </option>
                ))
              }
            </select>
          </Modal>) : null
      }
    </div>
  )
}
export default Search;
