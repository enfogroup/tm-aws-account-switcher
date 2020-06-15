export default <string>`
#aws-switch-account-button, #aws-switch-account-list {
  font-family: "Amazon Ember","HelveticaNeue","Helvetica Neue","Amazon Ember",Roboto,"Roboto-Regular","Amazon Ember",Helvetica,Arial,sans-serif;
  padding: 10px;
  background-color: #ff9900;
  color: #ffffff;
  position: fixed;
  transition: all .2s ease-in-out;
  z-index:999;
}

#aws-switch-account-button,
#aws-switch-account-button *,
#aws-switch-account-list,
#aws-switch-account-list * {
  box-sizing: initial;
}

#aws-switch-account-search-field {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #a0a0a0;
  display: block;
  margin-bottom: 0px;
  height: 40px;
  border-radius: 0;
  width: 100%;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  color: #222222;
  font-size: 14px;
  line-height: 1.207;
}

#awsgnav .nav-menu .awsc-switched-role-username-wrapper .nav-elt-label {
  color: #fff;
}

#aws-switch-account-button {
  left: 10px;
  bottom: 10px;
  height: 30px;
  width: 30px;
  border-radius: 25px;
  padding: 10px;
  font-size: 23px;
  transform: scale(0.8) rotate(135deg);
  box-shadow: 0px 0px 3px 1px rgba(0,0,0,.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

#aws-switch-account-button > span {
  margin-top: -1px;
}

#aws-switch-account-button:hover {
  cursor: pointer;
  text-decoration: none;
  transform: rotate(135deg) scale(1.2)
}

#aws-switch-account-button.open {
  transform: rotate(0deg) scale(0.8);
  bottom: calc(50% + 10px);

}

#aws-switch-account-button.open:hover {
  transform: scale(1.2) rotate(0deg);
}

#aws-switch-account-list {
  background-color: #fff;
  left: 35px;
  bottom: 35px;
  opacity: 0;
  height: 0;
  width: 0;
  box-shadow: 3px 4px 9px 2px rgba(20,110,180,.4);
  overflow-y: auto;
  padding: 0px;
}

#aws-switch-account-list div {
  position: relative;
  padding: 0;
  margin: 0;
  background: rgba(20,110,180, 0.7);
  font-size: 16px;
  text-decoration: none;
  display: flex;
  align-items: center;
  color: #222222;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
}

#aws-switch-account-list div:not(:last-child) {
  margin-bottom: 2px;
}

#aws-switch-account-list div:hover {
  background: rgba(20,110,180, 0.6);
  cursor:pointer;
}

#aws-switch-account-list div form {
  width: 100%;
  margin: 0;
}

#aws-switch-account-list .back-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background: #bababa;
  border-radius: 20px;
  font-size: 12px;
  line-height: 1.236;
}

#aws-switch-account-list .back-icon ~ * {
  margin-left: 30px;
}

#aws-switch-account-list .role {
  position: absolute;
  right: 10px;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 4px;
  background: #222222;
  color: #fff;
  font-size: 8px;
  font-weight: bold;
  line-height: 1.279;
  border-radius: 4px;
  text-transform: uppercase;
}

#aws-switch-account-list .list-button {
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 12px 16px;
  color: #fff;
  background: transparent;
  text-align: left;
  font-size: 14px;
  line-height: 1.143;
  border: none;
  cursor: pointer;
}

#aws-switch-account-list.open {
  opacity: 1;
  max-height: 60%;
  width: 320px;
  max-width: 100%;
  height: auto;
  min-height: 20%;
}
`
