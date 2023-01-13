import {Meteor} from "meteor/meteor";
import Random from "meteor-random-node";
import Server from "../../api/classes/server/Server";

Meteor.startup(() => {
    Server.registerFunctions();
    Server.initServer();

    Accounts.onCreateUser(function (options,user) {
        if (typeof (user.services.password) != "undefined") {
            let newEmail = user.emails[0].address;

            let emailAlreadyExist = Meteor.users
                .find({ "emails.address": newEmail },{ limit: 1 })
                .count() > 0;
            if (emailAlreadyExist === true) {
                throw new Meteor.Error(403,"email already registered");
            }
            user.profile = {
                name: options.profile.name,
                isActive: true
            };
            if (Meteor.users.find().count() === 0) {
                user.roles = "super-user";
                user.access = Random.secret(6);
            } else {
                user.roles = "default-user";
            }
        }
        return user;
    });
});
