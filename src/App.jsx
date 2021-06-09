import React from "react";
import { createGlobalStyle } from 'styled-components';
import {  darkJoy, darkEva, darkSber } from '@sberdevices/plasma-tokens/themes';
import { text, background, gradient } from '@sberdevices/plasma-tokens';
import {
  createSmartappDebugger,
  createAssistant
} from "@sberdevices/assistant-client";

import "./App.css";
import { List } from './pages/List';
import APIHelper from "./APIHelper.jsx"

const startFrase = "Пищевые добавки — вещества, добавляемые в технологических целях в пищевые продукты в процессе производства, упаковки, транспортировки или хранения для придания им желаемых свойств."+
" Условно все «Е»-добавки разделяют на несколько групп. Е100 – Е199 используются для того, чтобы окрашивать продукты. Е200 – E299 представляют собой консерваторы, которые добавляются в продукты, чтобы они не портились." + 
" E300 – E399 - позволяют продуктам не окисляться на воздухе. Е400 – Е499 поддерживают нужную консистенцию продукта на протяжении длительного промежутка времени. Е500 – Е599 - эмульгаторы, Е600 – Е699 - усилители вкуса и аромата, Е800 – Е899 - запасные индексы, Е900 – Е999 - антифламинги. Ко второй группе относятся пищевые добавки, которые имеют четырехзначные цифровые коды. В частности, все эти пищевые добавки представляют собой ферменты.";

const ThemeBackgroundEva = createGlobalStyle(darkEva);
const ThemeBackgroundSber = createGlobalStyle(darkSber);
const ThemeBackgroundJoy = createGlobalStyle(darkJoy);

const DocumentStyle = createGlobalStyle`
    html:root {
        min-height: 100vh;
        color: ${text};
        background-color: ${background};
        background-image: ${gradient};
    }
`;


const initializeAssistant = (getState) => {
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? "",
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,
    });
  }
  return createAssistant({ getState });
};



export class App extends React.Component {

  constructor(props) {
    super(props);
    console.log('constructor');

    this.state = {
      character: "sber",
      request: "",
      answer: {
        information : startFrase,
        number : "",
        perm: "",
        dang: "",
      },
      completed: false
    }
    
    this.assistant = initializeAssistant(() => this.getStateForAssistant() );
    this.assistant.on("data", (event) => {
      switch (event.type) {
        case 'character':
            this.setState({character : event.character.id});
            break;
        case 'navigation':
            break;
        case 'smart_app_data':
            break;
        default:
            return;
    }
      console.log(`assistant.on(data)`, event);
      const { action } = event
      this.dispatchAssistantAction(action);
    });
    this.assistant.on("start", (event) => {
      console.log(`assistant.on(start)`, event);
    });

  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  getStateForAssistant () {
    console.log('getStateForAssistant: this.state:', this.state)
    const state = {
      item_selector: {
      items : this.state.request}}
    console.log('getStateForAssistant: state:', state)
    return state;
  }

  dispatchAssistantAction (action) {
    console.log('dispatchAssistantAction', action);
    if (action) {
      switch (action.type) {
        case 'find':
          return this.find(action);
        case 'back':
          return this.back(action);
        default:
          throw new Error();
      }
    }
  }

  back(action){
    console.log('back', action); 
    this.setState({
         answer: {information: startFrase},
         completed : false
    })
  }

  async find (action) {
    console.log('find', action);
    const info = await APIHelper.getInfo(action.search);
    if ( info.information !== undefined){
    this.setState({
      request: action.search,
      answer: {
        information : info.information,
        number : info.number,
        perm : info.position,
        dang : info.dungeon_master
      },
      completed: true
    })
    this.assistant.sendData({
    action: {
        action_id : "answer",
        parameters : {
            data : `${this.state.answer.information}`
        }
    }
    })
  }
  else {
    this.assistant.sendData({
      action: {
          action_id : "no_answer",
          parameters : {}
      }
      })
  }
  }

  render() {
    console.log('render');
    return (
      <div>
            <DocumentStyle />
            {(() => {
                switch (this.state.character) {
                    case 'sber':
                        return <ThemeBackgroundSber />;
                    case 'eva':
                        return <ThemeBackgroundEva />;
                    case 'joy':
                        return <ThemeBackgroundJoy />;
                    default:
                        return;
                }
            })()}
            <List
            onAdd  = {(search) => { 
               const pattern = "[e|E|е|Е]\s*?([0-9]{3,})";
               const match = search.match(pattern);
               if (match)
                  search = match[1];
               console.log(search)
              this.find({type: "find", search})
          }}
            item = {this.state.answer.information}
            name = {this.state.answer.number}
            dang = {this.state.answer.dang}
            perm = {this.state.answer.perm}
            completed = {this.state.completed}
          />
          </div>
          )}
}

