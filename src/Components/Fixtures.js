import React, { useEffect, useState } from "react";
import "../Styles/Fixtures.scss";
import $ from "jquery";
import _ from "underscore";
import { Dropdown, DropdownButton } from "react-bootstrap";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";
import Axios from "axios";

export default function Fixtures() {
 
  const id = localStorage.getItem("tournamentCardId")
  // const id =3
  let temp = []
  useEffect(() => {
    
    Axios.get(`http://139.59.16.180:8269/fixture/allFixtures/${id}`,
    { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    )
      .then(res => {
        console.log(res.data)
        console.log(res.data[0].id)
        
        res.data.map(data=>{
          let temp1 = []
          Axios.get(`http://139.59.16.180:8269/fixture/details/${data.id}`,
          { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
          )
          .then(res => {
            console.log(res.data)
            Axios.get(`http://139.59.16.180:8269/player/details/${res.data.player1}`,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            .then(res=>{
              console.log("P1 "+res.data.name)
              temp1.push(res.data.name)
            })
            .catch(err => console.log(err))
            Axios.get(`http://139.59.16.180:8269/player/details/${res.data.player2}`,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            .then(res=>{
              console.log("P2 "+res.data.name)
              temp1.push(res.data.name)
            })
            .catch(err => console.log(err))
          })
          .catch(err =>{
            console.log(err)
          })
          temp.push(temp1)
          console.log(temp)
        })

        // console.log(currentData)
      })
      .catch(err => {
        console.log(err)
      })


  },[])

  const history = useHistory()

//   if(!localStorage.getItem("token")){
//     history.push("/")
// }

  var knownBrackets = [2, 4, 8, 16, 32, 64], // brackets with "perfect" proportions (full fields, no byes)

  exampleTeams = 
  [[1,2],[3,4],[5,6],[7,8],[9,0],[11,12],[13,14],[15,16]]
      //  ["shreyas","rohan","rohit","arpit","piyush","shailu","sachin","rusmeen","ketn","pranjali"]
      , // because a bracket needs some teams!
    bracketCount = 0; console.log($(exampleTeams).length);

  const getBracket = ((base) => {

    var closest = _.find(knownBrackets, function (k) { return k >= base; }),
      byes = closest - base;

    if (byes > 0) base = closest;

    var brackets = [],
      round = 1,
      baseT = base / 2,
      baseC = base / 2,
      teamMark = 0,
      nextInc = base / 2;
    var i

    for (i = 1; i <= (base - 1); i++) {
      var baseR = i / baseT,
        isBye = false;

      if (byes > 0 && (i % 2 != 0 || byes >= (baseT - i))) {
        isBye = true;
        byes--;
      }

      var last = _.map(_.filter(brackets, function (b) { return b.nextGame == i; }), function (b) { return { game: b.bracketNo, teams: b.teamnames }; });

      brackets.push({
        lastGames: round == 1 ? null : [last[0].game, last[1].game],
        nextGame: nextInc + i > base - 1 ? null : nextInc + i,
        teamnames: round == 1 ? [exampleTeams[teamMark], exampleTeams[teamMark + 1]] : [last[0].teams[_.random(1)], last[1].teams[_.random(1)]],
        bracketNo: i,
        roundNo: round,
        bye: isBye
      });
      teamMark += 2;
      if (i % 2 != 0) nextInc--;
      while (baseR >= 1) {
        round++;
        baseC /= 2;
        baseT = baseT + baseC;
        baseR = i / baseT;
      }
    }

    renderBrackets(brackets);
  })

  const renderBrackets = ((struct) => {
    var groupCount = _.uniq(_.map(struct, function (s) { return s.roundNo; })).length;

    var group = $('<div class="group' + (groupCount + 1) + '" id="b' + bracketCount + '"></div>'),
      grouped = _.groupBy(struct, function (s) { return s.roundNo; });
    var g
    for (g = 1; g <= groupCount; g++) {
      var round = $('<div class="r' + g + '" id="r' + g + '"></div>');
      _.each(grouped[g], function (gg) {
        // console.log(gg.teamnames[0])
        if (gg.bye)
          round.append('<div></div>');
        else
          round.append('<div><div class="bracketbox"><span class="info1"></span><span class="info2"></span><div class="teama" id="teama"><div class="team-r1">'+gg.teamnames[0][0]+'</div><div class="team-r2">'+gg.teamnames[0][1]+'</div><div class="team-r3">data</div><div class="team-r4">data</div></div><div class="teamb" id="teamb"><div class="team-r1">'+gg.teamnames[1][0]+'</div><div class="team-r2">'+gg.teamnames[1][1]+'</div><div class="team-r3">data</div><div class="team-r4">data</div></div></div>');
          // round.append('<div><div class="bracketbox"><span class="info1">'+gg.bracketNo+'</span><span class="info2">'+gg.bracketNo+'</span><span class="teama">'+gg.teamnames[0]+'</span><span class="teamb">'+gg.teamnames[1]+'</span></div></div>');
      });
      group.append(round);
    }
    group.append('<div class="r' + (groupCount + 1) + '"><div class="final"><div class="bracketbox"><span class="teamc">' + _.last(struct).teamnames[_.random(1)] + '</span></div></div></div>');
    $('#brackets').append(group);

    bracketCount++;
    $('html,body').animate({
      scrollTop: $("#b" + (bracketCount - 1)).offset().top
    });
  })

  const addBracket = (() => {
    // var opts = parseInt(prompt('Bracket size (number of teams):',32));
    var opts = 8;

    if (!_.isNaN(opts) && opts <= _.last(knownBrackets))
      getBracket(opts);
    else
      alert('The bracket size you specified is not currently supported.');
    $('#clear').off('click');
    $('#clear').on('click', function () {
      $('#brackets').html("");
    });
  });


  useEffect(() => {
    document.getElementById("add").click()
  }, [])

  const backClicked = (e) => {
    history.push("/")
  }

  return (
    <div style={{ minWidth: "1000px" }}>
      <div className="tournament_heading fixtures_heading">
        <button id="back-button" onClick={e => backClicked(e)}><ArrowBackIcon /></button>
        <strong>Fixtures</strong>
        <div></div>
      </div>
      <div id="add" className="metroBtn" onClick={addBracket}>
        Add Bracket
      </div>
      <div className="fixtures_menu">
        <h4>Tournament Name</h4>
        {/* <form>
          <label>View for:</label>
          <DropdownButton id="dropdown-basic-button" title="type">
            <Dropdown.Item href="#/action-1">Singles</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Doubles</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Mixed</Dropdown.Item>
          </DropdownButton>
        </form> */}
      </div>
      <div className="brackets" id="brackets"></div>
    </div>
  );
};