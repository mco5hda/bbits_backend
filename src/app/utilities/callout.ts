export class CallOut {

    constructor () {}

    static addCallOut(action, message, seconds){
      let callOutDiv = document.getElementById('callOut');
      let callOut = '';
  
      switch(action){
        case 'success':
          callOut = '<div class="A-Icon A-Icon--success"></div>'
          callOut += '<span class="CallOut-Message">'+message+'</span>'
  
          callOutDiv.className += ' A-Callout A-Callout--success'
          break;
        case 'warning':
          callOut = '<div class="A-Icon A-Icon--warning"></div>'
          callOut += '<span class="CallOut-Message">'+message+'</span>'
  
          callOutDiv.className += ' A-Callout A-Callout--warning'
          break;
        case 'error':
          callOut = '<div class="A-Icon A-Icon--error image"></div>'
          callOut += '<span class="CallOut-Message">'+message+'</span>'
  
          callOutDiv.className += ' A-Callout A-Callout--error'
          break;
      }
  
      callOutDiv.innerHTML = callOut;
      callOutDiv.style.display = "inline";
  
      setTimeout(function (){
        callOutDiv.style.display = 'none'
        }, seconds
      );
    }

    static added: boolean = false;
    static updated: boolean = false;
    static deleted: boolean = false;
    static loaded: number = 0;
}