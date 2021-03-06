var React = require('react');
var Popover = require('./popover');
var DateUtil = require('./util/date');
var Calendar = require('./calendar');
var DateInput = require('./date_input');
var moment = require('moment');
var clone = require('clone');
var randomData = require('random-guid');


var DatePicker = React.createClass({
  
  getDefaultProps: function() {
    return {
      id: randomData.randomGuid(4),
      dateFormatCalendar: "MMMM YYYY",
      selected:moment()
    };
  },
  getInitialState: function() {
    return {
      focus: false,
      moment: moment
    };
  },
  componentWillMount: function() {
    var newMoment = clone(moment);
    switch(this.props.locale){
    case "nb": require('moment/locale/nb'); break;
    case "af": require("moment/locale/af"); break;
    case "ar-ma": require("moment/locale/ar-ma"); break;
    case "ar-sa": require("moment/locale/ar-sa"); break;
    case "ar-tn": require("moment/locale/ar-tn"); break;
    case "ar": require("moment/locale/ar"); break;
    case "az": require("moment/locale/az"); break;
    case "be": require("moment/locale/be"); break;
    case "bg": require("moment/locale/bg"); break;
    case "bn": require("moment/locale/bn"); break;
    case "bo": require("moment/locale/bo"); break;
    case "br": require("moment/locale/br"); break;
    case "bs": require("moment/locale/bs"); break;
    case "ca": require("moment/locale/ca"); break;
    case "cs": require("moment/locale/cs"); break;
    case "cv": require("moment/locale/cv"); break;
    case "cy": require("moment/locale/cy"); break;
    case "da": require("moment/locale/da"); break;
    case "de-at": require("moment/locale/de-at"); break;
    case "de": require("moment/locale/de"); break;
    case "el": require("moment/locale/el"); break;
    case "en-au": require("moment/locale/en-au"); break;
    case "en-ca": require("moment/locale/en-ca"); break;
    case "en-gb": require("moment/locale/en-gb"); break;
    case "eo": require("moment/locale/eo"); break;
    case "es": require("moment/locale/es"); break;
    case "et": require("moment/locale/et"); break;
    case "eu": require("moment/locale/eu"); break;
    case "fa": require("moment/locale/fa"); break;
    case "fi": require("moment/locale/fi"); break;
    case "fo": require("moment/locale/fo"); break;
    case "fr-ca": require("moment/locale/fr-ca"); break;
    case "fr": require("moment/locale/fr"); break;
    case "fy": require("moment/locale/fy"); break;
    case "gl": require("moment/locale/gl"); break;
    case "he": require("moment/locale/he"); break;
    case "hi": require("moment/locale/hi"); break;
    case "hr": require("moment/locale/hr"); break;
    case "hu": require("moment/locale/hu"); break;
    case "hy-am": require("moment/locale/hy-am"); break;
    case "id": require("moment/locale/id"); break;
    case "is": require("moment/locale/is"); break;
    case "it": require("moment/locale/it"); break;
    case "ja": require("moment/locale/ja"); break;
    case "jv": require("moment/locale/jv"); break;
    case "ka": require("moment/locale/ka"); break;
    case "km": require("moment/locale/km"); break;
    case "ko": require("moment/locale/ko"); break;
    case "lb": require("moment/locale/lb"); break;
    case "lt": require("moment/locale/lt"); break;
    case "lv": require("moment/locale/lv"); break;
    case "me": require("moment/locale/me"); break;
    case "mk": require("moment/locale/mk"); break;
    case "ml": require("moment/locale/ml"); break;
    case "mr": require("moment/locale/mr"); break;
    case "ms-my": require("moment/locale/ms-my"); break;
    case "my": require("moment/locale/my"); break;
    case "ne": require("moment/locale/ne"); break;
    case "nl": require("moment/locale/nl"); break;
    case "nn": require("moment/locale/nn"); break;
    case "pl": require("moment/locale/pl"); break;
    case "pt-br": require("moment/locale/pt-br"); break;
    case "pt": require("moment/locale/pt"); break;
    case "ro": require("moment/locale/ro"); break;
    case "ru": require("moment/locale/ru"); break;
    case "si": require("moment/locale/si"); break;
    case "sk": require("moment/locale/sk"); break;
    case "sl": require("moment/locale/sl"); break;
    case "sq": require("moment/locale/sq"); break;
    case "sr-cyrl": require("moment/locale/sr-cyrl"); break;
    case "sr": require("moment/locale/sr"); break;
    case "sv": require("moment/locale/sv"); break;
    case "ta": require("moment/locale/ta"); break;
    case "th": require("moment/locale/th"); break;
    case "tl-ph": require("moment/locale/tl-ph"); break;
    case "tr": require("moment/locale/tr"); break;
    case "tzm-latn": require("moment/locale/tzm-latn"); break;
    case "tzm": require("moment/locale/tzm"); break;
    case "uk": require("moment/locale/uk"); break;
    case "uz": require("moment/locale/uz"); break;
    case "vi": require("moment/locale/vi"); break;
    case "zh-cn": require("moment/locale/zh-cn"); break;
    case "zh-tw": require("moment/locale/zh-tw"); break;
    }

    newMoment.locale(this.props.locale);
    newMoment().format(this.props.dateFormatCalendar);
    this.setState({moment:newMoment,locale:this.props.locale});
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    if(nextState.focus === this.state.focus){
      return false;
    }    
    return true;
  },

  handleFocus: function() {
    this.setState({
      focus: true
    });
  },

  hideCalendar: function() {
    setTimeout(function() {
      this.setState({
        focus: false
      });
    }.bind(this), 0);
  },

  handleSelect: function(date) {
    this.setSelected(date);

    setTimeout(function(){
      this.hideCalendar();
    }.bind(this), 200);
  },

  setSelected: function(date) {
    this.props.onChange(date.moment());
  },

  clearSelected: function() {
    this.props.onChange(null);
  },  

  onInputClick: function() {
    this.setState({
      focus: true
    });
  },

  calendar: function() {

    if (this.state.focus) {
      return (
        <Popover>
          <Calendar
            weekdays={this.props.weekdays}
            locale={this.state.locale}
            moment={this.state.moment}
            dateFormat={this.props.dateFormatCalendar}
            selected={this.props.selected}
            onSelect={this.handleSelect}
            id={this.props.id}
            hideCalendar={this.hideCalendar}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            weekStart={this.props.weekStart} />
        </Popover>
      );
    }
  },

  render: function() {
    return (
      <div>
        <DateInput
          name={this.props.name}
          date={this.props.selected}
          locale={this.state.locale}
          moment={this.state.moment}
          dateFormat={this.props.dateFormat}
          focus={this.state.focus}
          onFocus={this.handleFocus}
          id={this.props.id}
          handleClick={this.onInputClick}
          handleEnter={this.hideCalendar}
          setSelected={this.setSelected}
          clearSelected={this.clearSelected}
          hideCalendar={this.hideCalendar}
          placeholderText={this.props.placeholderText} />
        {this.calendar()}
      </div>
    );
  }
});

module.exports = DatePicker;
