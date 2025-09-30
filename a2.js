/*************************************************************
I declare that this assignment is my own work in accordance with
Seneca Academic Policy. No part of this assignment has been
copied manually or electronically from any other source
(including web sites) or distributed to other students.

Name: Kunwar Bedi
Student ID: 106681232
Date: september 28,2025
*************************************************************/


class LegoData {
    constructor() {
        this.sets = [];
    }

    initialize() {
        return new Promise((resolve, reject) => {
            try {
                const setData = require("./data/setData.json");
                const themeData = require("./data/themeData.json");

                this.sets = setData.map(set => {
                    const themeObj = themeData.find(theme => theme.id === set.theme_id);
                    return {
                        ...set,
                        theme: themeObj ? themeObj.name : "Unknown"
                    };
                });

                resolve();
            } catch (err) {
                reject(`Unable to read data files: ${err}`);
            }
        });
    }

    getAllSets() {
        return new Promise((resolve, reject) => {
            if (this.sets.length > 0) resolve(this.sets);
            else reject("No sets available");
        });
    }

    getSetByNum(setNum) {
        return new Promise((resolve, reject) => {
            const foundSet = this.sets.find(set => set.set_num === setNum);
            if (foundSet) resolve(foundSet);
            else reject(`Unable to find set: ${setNum}`);
        });
    }

    getSetsByTheme(theme) {
        return new Promise((resolve, reject) => {
            const matchedSets = this.sets.filter(set =>
                set.theme && set.theme.toLowerCase().includes(theme.toLowerCase())
            );
            if (matchedSets.length > 0) resolve(matchedSets);
            else reject(`Unable to find sets for theme: ${theme}`);
        });
    }
}
// Test code
const lego = new LegoData();

lego.initialize()
    .then(() => {
        // 1. Print the number of sets
        lego.getAllSets()
            .then(sets => {
                console.log(`Number of sets: ${sets.length}`);
            })
            .catch(err => console.log(err));

        // 2. Print a set by set number
        lego.getSetByNum("0012-1")
            .then(set => console.log("Sample set (0012-1):", set))
            .catch(err => console.log(err));

        // 3. Print number of sets for theme "tech"
        lego.getSetsByTheme("tech")
            .then(sets => {
                console.log(`Number of sets with theme 'tech': ${sets.length}`);
            })
            .catch(err => console.log(err));
    })
    .catch(err => {
        console.log(err);
    });
