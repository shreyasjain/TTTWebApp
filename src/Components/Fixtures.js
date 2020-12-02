import React, { useEffect } from "react";
import "../Styles/Fixtures.scss";
import $ from "jquery";
import _ from "underscore";
import { Dropdown, DropdownButton } from "react-bootstrap";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useHistory} from "react-router-dom";

const someteams = [
  "New Jersey ",
  "New York ",
  "New York ",
  "Philadelphia ",
  "New Jersey ",
  "New York ",
  "New York ",
  "Philadelphia ",
  "New Jersey ",
  "New York ",
  "New York ",
  "Philadelphia ",
  "New Jersey ",
  "New York ",
  "New York ",
  "Philadelphia ",
  "New Jersey Devils",
  "New York Islanders",
  "New York Rangers",
  "Philadelphia Flyers",
  "New Jersey Devils",
  "New York Islanders",
  "New York Rangers",
  "Philadelphia Flyers",
  "New Jersey Devils",
  "New York Islanders",
  "New York Rangers",
  "Philadelphia Flyers",
  "New Jersey Devils",
  "New York Islanders",
  "New York Rangers",
  "Philadelphia Flyers",
  "New Jersey Devils",
  "New York Islanders",
  "New York Rangers",
  "Philadelphia Flyers",
  "New Jersey Devils",
  "New York Islanders",
  "New York Rangers",
  "Philadelphia Flyers",
  "Pittsburgh Penguins",
  "Boston Bruins",
  "Buffalo Sabres",
  "Montreal Canadiens",
  "Ottawa Senators",
  "Toronto Maple Leafs",
  "Carolina Hurricanes",
  "Florida Panthers",
  "Tampa Bay Lightning",
  "Washington Capitals",
  "Winnipeg Jets",
  "Chicago Blackhawks",
  "Columbus Blue Jackets",
  "Detroit Red Wings",
  "Nashville Predators",
  "St. Louis Blues",
  "Calgary Flames",
  "Colorado Avalanche",
  "Edmonton Oilers",
  "Minnesota Wild",
  "Vancouver Canucks",
  "Anaheim Ducks",
  "Dallas Stars",
  "Los Angeles Kings",
  "Phoenix Coyotes",
  "San Jose Sharks",
  "Montreal Wanderers",
  "Quebec Nordiques",
  "Hartford Whalers"
];

export default function Fixtures() {

  const history = useHistory()

  var knownBrackets = [2, 4, 8, 16, 32, 64], // brackets with "perfect" proportions (full fields, no byes)

    exampleTeams = _.shuffle(["New Jersey Devils", "New York Islanders", "New York Rangers", "Philadelphia Flyers", "New Jersey Devils", "New York Islanders", "New York Rangers", "Philadelphia Flyers", "New Jersey Devils", "New York Islanders", "New York Rangers", "Philadelphia Flyers", "New Jersey Devils", "New York Islanders", "New York Rangers", "Philadelphia Flyers", "New Jersey Devils", "New York Islanders", "New York Rangers", "Philadelphia Flyers", "New Jersey Devils", "New York Islanders", "New York Rangers", "Philadelphia Flyers", "New Jersey Devils", "New York Islanders", "New York Rangers", "Philadelphia Flyers", "New Jersey Devils", "New York Islanders", "New York Rangers", "Philadelphia Flyers", "New Jersey Devils", "New York Islanders", "New York Rangers", "Philadelphia Flyers", "New Jersey Devils", "New York Islanders", "New York Rangers", "Philadelphia Flyers", "Pittsburgh Penguins", "Boston Bruins", "Buffalo Sabres", "Montreal Canadiens", "Ottawa Senators", "Toronto Maple Leafs", "Carolina Hurricanes", "Florida Panthers", "Tampa Bay Lightning", "Washington Capitals", "Winnipeg Jets", "Chicago Blackhawks", "Columbus Blue Jackets", "Detroit Red Wings", "Nashville Predators", "St. Louis Blues", "Calgary Flames", "Colorado Avalanche", "Edmonton Oilers", "Minnesota Wild", "Vancouver Canucks", "Anaheim Ducks", "Dallas Stars", "Los Angeles Kings", "Phoenix Coyotes", "San Jose Sharks", "Montreal Wanderers", "Quebec Nordiques", "Hartford Whalers"]), // because a bracket needs some teams!
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
      var round = $('<div class="r' + g + '"></div>');
      _.each(grouped[g], function (gg) {
        if (gg.bye)
          round.append('<div></div>');
        else
          round.append('<div><div class="bracketbox"><span class="info1"></span><span class="info2"></span><div class="teama"><div class="team-r1">Team1</div><div class="team-r2">Team2</div><div class="team-r3">data</div><div class="team-r4">data</div></div><div class="teamb"><div class="team-r1">Team1</div><div class="team-r2">Team2</div><div class="team-r3">data</div><div class="team-r4">data</div></div></div>');
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

  const backClicked = (e)=>{
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
      <form>
        <label>View for:</label>
        <DropdownButton id="dropdown-basic-button" title="type">
          <Dropdown.Item href="#/action-1">Singles</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Doubles</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Mixed</Dropdown.Item>
        </DropdownButton>
      </form>
      </div>
      <div className="brackets" id="brackets"></div>
    </div>
  );
};