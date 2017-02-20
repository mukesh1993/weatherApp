  var React=require("react");
  var ReactDOM=require("react-dom");
  var Component=React.createClass({

    getInitialState:function() {
      return({name:"", weatherObj:[],ready:false,datesdata:[]});
    },
    handleClick:function(e){

    this.setState({name:e.target.value});
  },
  filterDates:function(date)
  {
   var a=[];
   a[0]=date[0].dt_txt.split(" ")[0];
   var i=0;
   for(var k in date)
   {
     var z=date[k];
     var y=z.dt_txt.split(" ")[0];
     if(y!=a[i])
     {
       a[++i]=z.dt_txt.split(" ")[0];
     }
   }
   return a;
  },

  saving:function()
  {
   var a=this.state.name;
   this.setState({ready:false})
    $.ajax({
           url: "http://api.openweathermap.org/data/2.5/forecast?q="+a+",us&mode=json&appid=05ca973f81bfcd400cc54c6398461827",

           dataType: 'json',

           type: 'GET',
     success: function(data)
     {
       this.setState({weatherObj:data.list});
        var dates = this.filterDates(data.list);

        this.setState({ready:true,datesdata:dates});

     }.bind(this),
     error: function(xhr, status, err) {
       console.error("Error.."+err.toString());
     }.bind(this)
    });

  },
  singleTab:function(title){
  var newData =this.state.weatherObj.map(function(e){
   if(e.dt_txt.split(" ")[0]===title)

   return e;
  },this);

  },


  render:function(){

      var dateparse= this.state.datesdata.map(function(e){
             return(this.singleTab(e));

         },this);
      var singleReport = function(data){
        return(
          <div className="panel panel-info col-sm-4" key = {data.dt_txt}>
              <div className="panel-heading">{"At "+data.dt_txt}</div>
              <div className="panel-body">
              <span>
                MinTemp: <b>{data.main.temp_max}  </b>
                MaxTemp: <b>{data.main.temp_min} </b><br/>
                Humidity: <b>{data.main.humidity}  </b>
                Weather: <b>{data.weather[0].description.toUpperCase()}</b>
              </span>
              </div>
          </div>
        )
      };
    return(
      <div className = 'container'>
      <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <center>
            <div className="navbar-header">
                <a className="navbar-brand" href="#">Weather Application</a>
            </div>
            </center>
          </div>
        </nav>
        <div className = 'row'>
        <div className="form-group col-lg-10">
            <input className="form-control input-lg" placeholder="city name" onChange={this.handleClick} type="text"/>
      </div>

      <button className="btn btn-primary btn-lg" onClick={this.saving} style = {{bordeTopWidth: '1px',
                                                      paddingRight: '60px',
                                                      paddingLeft: '60px'}}
                                                      >search</button>
      </div>
      <div className = 'row'>
      {
        this.state.weatherObj.map(
          function (obj) {
            return singleReport(obj);
          }
        )

      }
      </div>

      </div>
    );
  }
  });
  ReactDOM.render(<Component/>,document.getElementById('app1'));