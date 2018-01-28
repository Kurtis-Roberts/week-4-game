// var terran = { attack: 0, defense: 100 };
// var protoss = { attack: 0, defense: 120 };
// var zerg = { attack: 0, defense: 150 };
// var terminator = { attack: 0, defense: 180 };




//////////////////////// GLOBAL VARIABLES ////////////////////////


var selectedCharacterToggle = false;
var selectedEnemyToggle = false;
var selectedCharacter;
var selectedEnemy;
var myCharacterAttack;
var myCharacterDefense;
var enemyAttack;
var enemyDefense;
var enemyCounter;
var defeated = [];
var gameClone = $("#rpgGame").clone()


//////////////////////////// AUDIO ///////////////////////////////
var protossAudio = new Audio("assets/audio/Aire.wav");
var terranAudio = new Audio("assets/audio/marine.wav");
var zergAudio = new Audio("assets/audio/zergling.wav");
var terminatorAudio = new Audio("assets/audio/hasta.wav");



/////////////////////////// CHARACTER STATS /////////////////////////
$("#terran-defense").text(terran.defense)
$("#protoss-defense").text(protoss.defense)
$("#zerg-defense").text(zerg.defense)
$("#terminator-defense").text(terminator.defense)
    /*var terran = {
        name: "Terran",
        healthPoints: 120,
        baseAttackPower: 8,
        counterAttackPower: 10,
        attackPower: 8
    };
    var protoss = {
        name: "protoss",
        healthPoints: 100,
        baseAttackPower: 10,
        counterAttackPower: 15,
        attackPower: 10
    };
    var zerg = {
        name: "zerg",
        healthPoints: 150,
        baseAttackPower: 5,
        counterAttackPower: 8,
        attackPower: 5
    };
    var terminator = {
        name: "terminator",
        healthPoints: 180,
        baseAttackPower: 4,
        counterAttackPower: 22,
        attackPower: 4
    };
    var enemies = [];
    var defeated = [];
    var characters = [terran, protoss, zerg, terminator];*/


/////////////////////////// ON CLICK EVENTS /////////////////////////

$(".character").on("click", selectedCharacter);
$("#enemy-area").on('click', '.enemies', selectedEnemy);


$('#attack').on('click', attack);
$('#reset').on('click', gameReset);

////////////////////////////////////////////////////////////////


$(document).ready(function() {
    $("#attack").hide();
    $("#reset").hide();
    $("#attack-info").hide();
    $("#characterHealth").text(myCharacterDefense)
    $("#enemyHealth").text(enemyDefense)
    $(".enemyAvail").hide();
});


////////////////////////// FUNCTION ////////////////////////////

function selectedCharacter() {
    if (!selectedCharacterToggle) {
        $(this).addClass("test");
        $(this).removeClass("character");

        $(".character").removeClass("col-md-3");
        $(".character").addClass("col-md-4");
        $("#enemy-area").append($(".character"));
        var stats = ($(this).data("stats"));
        selectedCharacter = stats[0].name;
        myCharacterAttack = stats[0].attack
        myCharacterDefense = stats[0].defense
        $(".character").addClass("enemies");
        console.log(this)
        selectedCharacterToggle = true;
        if (selectedCharacter === "protoss")
            protossAudio.play()
        if (selectedCharacter === "terran")
            terranAudio.play()
        if (selectedCharacter === "zerg")
            zergAudio.play()
        if (selectedCharacter === "terminator")
            terminatorAudio.play()
        $(".enemyAvail").show();

    } else {
        console.log("You already picked an Enemy")
    }
}


///////////////////////// FUNCTION //////////////////////////

function selectedEnemy() {
    if (!selectedEnemyToggle) {
        $(this).addClass("fighter");
        $(this).removeClass(".enemies");
        var stats = ($(this).data("stats"));
        selectedEnemy = stats[0].name;
        console.log(selectedEnemy)
        enemyAttack = stats[0].attack;
        enemyDefense = stats[0].defense;
        enemyCounter = stats[0].counter;
        $(".fighter").removeClass("col-md-4");
        $(".fighter").addClass("col-md-10");
        $("#fighting-section").html($(".fighter"));
        selectedEnemyToggle = true;
        if (selectedEnemy === "protoss") {
            protossAudio.play()
        } else if (selectedEnemy === "terran") {
            terranAudio.play()
        } else if (selectedEnemy === "zerg") {
            zergAudio.play()
        } else if (selectedEnemy === "terminator") {
            terminatorAudio.play()
        }
        $("#attack").show()
        $("#attack-info").show()
        $("#enemy-health-text").show()


    } else {
        $("#reset").show()
        console.log("You already picked a Fighter");
    }

}


///////////////////////// FUNCTION //////////////////////////

function attack() {

    $("#characterHealth").text(myCharacterDefense)
    $("#enemyHealth").text(enemyDefense)
    $("#characterAttackLevel").text(myCharacterAttack)
    $("#enemyAttackLevel").text(enemyCounter)
    if (myCharacterDefense >= 1) {
        if (enemyDefense >= 1) {
            if (selectedEnemy) {
                console.log("My Attack:" + myCharacterAttack)
                console.log("My Defense:" + myCharacterDefense)

                console.log("Enemy Attack:" + enemyAttack)
                console.log("Enemy Defense:" + enemyDefense)
                console.log("Enemy Counter:" + enemyCounter)

                myCharacterDefense = myCharacterDefense - enemyCounter;
                enemyDefense = enemyDefense - myCharacterAttack;


                console.log("Your New Health is " + myCharacterDefense)
            } else {
                alert("No Enemy Selected")
            }

            if (selectedCharacter === "protoss") {
                myCharacterAttack = myCharacterAttack * 2
                    // $("#characterHealth").removeClass("good")
                    // $("#characterHealth").addClass("bad")

            }
            $("#reset").show();
            myCharacterAttack = myCharacterAttack
        } else {
            console.log("ENEMY CHARACTER DEFEATED")
                // $("#reset").show();
            selectedEnemyToggle = false;
            enemyReset();
        }


    } else {
        alert("YOU LOSE!")
        $("#attack").hide();
        $("#reset").show();


    }
}



//////////////////////////// FUNCTION ////////////////////////////////

function enemyReset() {
    selectedEnemy = false;
    $("#attack").hide();
    $("#enemy-health-text").hide();
    $("#fighting-section").empty();
    $("#enemyHealth").empty();

    // var stats = ($(this).data("stats"));
    // selectedEnemy = stats[0].name;
    // enemyAttack = stats[0].attack;
    // enemyDefense = stats[0].defense;
    // enemyCounter = stats[0].counter;
}

//////////////////////////////////////////////////////////

function gameReset() {
    location.reload();


}