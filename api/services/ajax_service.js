const co = require('co');

module.exports = {
    // user view all
  userAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      User_view.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
    // user view all
  userFind(inputCond) {
    return new Promise((resolve, reject) => {
      User_view.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
    // token view all
  tokenAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Token_view.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
    // token view all
  tokenFind(inputCond) {
    return new Promise((resolve, reject) => {
      Token_view.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
    // notify view all
  notifyAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Notify_view.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
    // notify view all
  notifyFind(inputCond) {
    return new Promise((resolve, reject) => {
      Notify_view.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
    // article view all
  articleAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Article_view.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
    // article view all
  articleFind(inputCond) {
    return new Promise((resolve, reject) => {
      Article_view.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
    // Pet view all
  petAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Pet_view.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
    // Pet view all
  petFind(inputCond) {
    return new Promise((resolve, reject) => {
      Pet_view.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
    // tracker view all
  trackerAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Tracker_view.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
    // tracker view all
  trackerFind(inputCond) {
    return new Promise((resolve, reject) => {
      Tracker_view.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // art_comment view all
  art_commentAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Art_comment_view.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // art_comment view all
  art_commentFind(inputCond) {
    return new Promise((resolve, reject) => {
      Art_comment_view.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // favorite view count
  favoriteAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Favorite_view.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // favorite view all data
  favoriteFind(inputCond) {
    return new Promise((resolve, reject) => {
      Favorite_view.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // support view count
  supportAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      View_support.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // support view all data
  supportFind(inputCond) {
    return new Promise((resolve, reject) => {
      View_support.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // accuse view count
  accuseAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Accuse_view.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // accuse view all data
  accuseFind(inputCond) {
    return new Promise((resolve, reject) => {
      Accuse_view.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // black_list view count
  black_listAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Black_list_view.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // black_list view all data
  black_listFind(inputCond) {
    return new Promise((resolve, reject) => {
      Black_list_view.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // pet_type view count
  pet_typeAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Pet_type.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // pet_type view all data
  pet_typeFind(inputCond) {
    return new Promise((resolve, reject) => {
      Pet_type.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // send_like view count
  send_likeAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Send_like.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // send_like view all data
  send_likeFind(inputCond) {
    return new Promise((resolve, reject) => {
      Send_like.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // Device_model view count
  device_modelAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Device_model.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // Device_model view all data
  device_modelFind(inputCond) {
    return new Promise((resolve, reject) => {
      Device_model.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // Device_model view count
  map_groupAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Map_group.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // Device_model view all data
  map_groupFind(inputCond) {
    return new Promise((resolve, reject) => {
      Map_group.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // map_chest view count
  map_chestAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Map_chest.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // map_chest view all data
  map_chestFind(inputCond) {
    return new Promise((resolve, reject) => {
      Map_chest.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // map_prod_group view count
  map_prod_groupAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Map_prod_group_view.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // map_prod_group view all data
  map_prod_groupFind(inputCond) {
    return new Promise((resolve, reject) => {
      Map_prod_group_view.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // map_prize view count
  map_prizeAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Map_prize_view.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // map_prize view all data
  map_prizeFind(inputCond) {
    return new Promise((resolve, reject) => {
      Map_prize_view.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // map_get_prize view count
  map_get_prizeAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Map_get_prize_view.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // map_get_prize view all data
  map_get_prizeFind(inputCond) {
    return new Promise((resolve, reject) => {
      Map_get_prize_view.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // map_user_bag view count
  map_user_bagAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Map_user_bag_view.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // map_user_bag view all data
  map_user_bagFind(inputCond) {
    return new Promise((resolve, reject) => {
      Map_user_bag_view.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // map_pet_level view count
  map_pet_levelAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Map_pet_level_view.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // map_pet_level view all data
  map_pet_levelFind(inputCond) {
    return new Promise((resolve, reject) => {
      Map_pet_level_view.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // map_pet_level view count
  map_pointAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Map_point.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // map_pointFind view all data
  map_pointFind(inputCond) {
    return new Promise((resolve, reject) => {
      Map_point.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // map_pointUpdate view all data
  map_pointUpdate(find,inputCond) {
    return new Promise((resolve, reject) => {
      Map_point.update(find,inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // Device view count
  deviceAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Device.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // device_driver view all data
  deviceFind(inputCond) {
    return new Promise((resolve, reject) => {
      Device.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // device_driver view count
  device_driverAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Device_driver.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // device_driver view all data
  device_driverFind(inputCond) {
    return new Promise((resolve, reject) => {
      Device_driver.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // device_driver view count
  nationAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      View_nation.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // nation view all data
  nationFind(inputCond) {
    return new Promise((resolve, reject) => {
      View_nation.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // pet_photo view count
  pet_photoAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Pet_photo_view.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // pet_photo view all data
  pet_photoFind(inputCond) {
    return new Promise((resolve, reject) => {
      Pet_photo_view.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // pet_mood view count
  pet_moodAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Pet_mood_view.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // pet_mood view all data
  pet_moodFind(inputCond) {
    return new Promise((resolve, reject) => {
      Pet_mood_view.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // map_erp view count
  map_erpAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Map_erp_view.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // map_erp view all data
  map_erpFind(inputCond) {
    return new Promise((resolve, reject) => {
      Map_erp_view.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // announcement view count
  announcementAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Announcement.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // announcement view all data
  announcementFind(inputCond) {
    return new Promise((resolve, reject) => {
      Announcement.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // announcement view count
  suggestAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Suggest.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // announcement view all data
  suggestFind(inputCond) {
    return new Promise((resolve, reject) => {
      Suggest.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // announcement view count
  question_typeAjaxCount(inputCond) {
    return new Promise((resolve, reject) => {
      Question_type.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // announcement view all data
  question_typeFind(inputCond) {
    return new Promise((resolve, reject) => {
      Question_type.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // announcement view count
  replyCount(inputCond) {
    return new Promise((resolve, reject) => {
      Reply.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // announcement view all data
  replyFind(inputCond) {
    return new Promise((resolve, reject) => {
      Reply.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // announcement view count
  statusCount(inputCond) {
    return new Promise((resolve, reject) => {
      Status.count(inputCond).exec((err, countData) => {
        if (err) {
          reject(err);
        } else {
          resolve(countData);
        }
      });
    });
  },
  // announcement view all data
  statusFind(inputCond) {
    return new Promise((resolve, reject) => {
      Status.find(inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  },
  // announcement view all data
  nationUpdate(whereCond, inputCond) {
    return new Promise((resolve, reject) => {
      Nation.update(whereCond,inputCond).exec((err, fdata) => {
        if (err) {
          reject(err.details);
        } else {
          resolve(fdata);
        }
      });
    });
  }
};
