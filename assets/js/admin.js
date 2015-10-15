function WprsrvAdmin(e){"use strict";this.$=e,this.$body=this.$("body"),this.pikadaySettings={i18n:{previousMonth:"Previous Month",nextMonth:"Next Month",months:["January","February","March","April","May","June","July","August","September","October","November","December"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},format:"YYYY-MM-DD"}}WprsrvAdmin.prototype.spawnPikadayFields=function(e){var t;if(t=void 0===e?this.$("input.wprsrv-pikaday"):e,t.length&&t){var n=this.pikadaySettings;window.WprsrvAdmin.pikadayFields=[],t.each(function(e,t){n.field=t,window.WprsrvAdmin.pikadayFields.push(new Pikaday(n))})}},WprsrvAdmin.prototype.reservationEditScreen=function(){"use strict";var e=this.$body.hasClass("post-php"),t=this.$body.hasClass("post-type-reservation");if(e&&t){var n=document.getElementById("title"),i=document.getElementById("titlewrap"),s=null;if(n){s=n.value,n.type="hidden";var r=document.createElement("h2");r.innerHTML=s,i.appendChild(r)}}},WprsrvAdmin.prototype.reservationAdminNotes=function(){"use strict";var e=document.getElementById("new-note-button");if(e){var t=this.$(e),n=document.getElementById("new-note-field"),i=document.getElementById("post_ID"),s=i.value,r=document.getElementById("user-id"),a=r.value;t.on("click",function(t){if(t.preventDefault(),e.disabled=!0,n.value.replace(/ +/,"").length){var i=n.value,r=this.$.post(ajaxurl,{action:"wprsrv_add_note",post_id:s,user_id:a,note_content:i});return window.setTimeout(function(){e.disabled=!1},7500),r.always(function(){e.disabled=!1}),r.done(function(e){console.log("Note request success!"),n.value=null,window.location=window.location}),r.fail(function(e){console.log("Note request error!")}),!1}}.bind(this))}},WprsrvAdmin.prototype.reservationStatusChanges=function(){"use strict";var e=document.getElementById("accept-reservation"),t=document.getElementById("decline-reservation"),n=document.getElementById("post_ID"),i=n.value,s=document.getElementById("user-id"),r=s.value;if(e){var a=document.createElement("div");a.className="spinner",e.parentNode.insertBefore(a,e.nextSibling);var o=this.$(e);o.on("click",function(t){t.preventDefault(),a.className+=" is-active";var n=this.$.post(ajaxurl,{action:"wprsrv_accept_reservation",post_id:i,user_id:r});return n.done(function(t){0===parseInt(t)&&(e.disabled=!0,window.setTimeout(function(){e.disabled=!1},5e3))}),n.always(function(e){a.className="spinner"}),!1}.bind(this))}if(t){var d=document.createElement("div");d.className="spinner",t.parentNode.insertBefore(d,t.nextSibling);var l=this.$(t);l.on("click",function(e){e.preventDefault(),d.className+=" is-active";var n=this.$.post(ajaxurl,{action:"wprsrv_decline_reservation",post_id:i,user_id:r});return n.done(function(e){0===parseInt(e)&&(t.disabled=!0,window.setTimeout(function(){t.disabled=!1},5e3))}),n.always(function(e){d.className="spinner"}),!1}.bind(this))}},WprsrvAdmin.prototype.reservationAjaxActions=function(){"use strict";var e=this.$body.hasClass("post-php"),t=this.$body.hasClass("post-type-reservation");e&&t&&(this.reservationAdminNotes(),this.reservationStatusChanges())},WprsrvAdmin.prototype.reservableEditScreen=function(){"use strict";var e=this.$body.hasClass("post-php"),t=this.$body.hasClass("post-type-reservable");if(e&&t){var n=this.$(".wprsrv-clonerow"),i=function(e){e.preventDefault();var t=e.data.row;return console.log("removing..."),t.remove(),!1}.bind(this),s=function(e){e.preventDefault();var t=e.data.addBtn,n=e.data.clonable;console.log("Cloning...");var s=n.clone();s.one("click",".deletion",{row:s},i),console.log(s),s.insertBefore(t),s[0].className="wprsrv-repeater-row";var r=s.find("input");return r[0].name="wprsrv[reservable_disabled_days][start][]",r[1].name="wprsrv[reservable_disabled_days][end][]",s.attr("style",""),this.spawnPikadayFields(r),!1}.bind(this),r=function(e,t){var n=this.$(t),i=n.parent().find(".add-row");i.on("click",{addBtn:i,clonable:n},s)}.bind(this);n.length&&(n.each(r),n.parent().find(".wprsrv-repeater-row").each(function(e,t){var n=this.$(t);n.on("click",".deletion",{row:n},i)}.bind(this))),this.reservableCalendars(),this.reservableActions()}},WprsrvAdmin.prototype.reservableActions=function(){"use strict";var e=document.getElementById("flush-reservable-cache"),t=this.$(e),n=document.getElementById("post_ID"),i=n.value,s=document.createElement("div");s.className="spinner",e.parentNode.insertBefore(s,e.nextSibling),e.disabled=!1,t.on("click",function(t){t.preventDefault(),s.className+=" is-active";var n=this.$.post(ajaxurl,{action:"wprsrv_flush_reservable_cache",post_id:i});return n.done(function(t){console.log(t),0===parseInt(t)&&(e.disabled=!0,window.setTimeout(function(){e.disabled=!1},5e3))}),n.error(function(e){}),n.always(function(e){s.className="spinner"}),!1}.bind(this))},WprsrvAdmin.prototype.reservableCalendars=function(){"use strict";var e=document.getElementById("reservablereservations");if(e){var t=function(e){var t=e.data.link,n=t.parents("table"),i=n.prev("table");n.removeClass("active"),i.addClass("active")},n=function(e){var t=e.data.link,n=t.parents("table"),i=n.next("table");n.removeClass("active"),i.addClass("active")},i=this.$(e),s=i.find(".prev-month"),r=i.find(".next-month");s.each(function(e,n){var i=this.$(n);i.on("click",{link:i},t)}.bind(this)),r.each(function(e,t){var i=this.$(t);i.on("click",{link:i},n)}.bind(this))}},WprsrvAdmin.prototype.initialize=function(){"use strict";console.log("Initializing Wprsrv admin scripts..."),this.reservationEditScreen(),this.reservationAjaxActions(),this.reservableEditScreen(),this.spawnPikadayFields()},jQuery(document).ready(function(){"use strict";window.WprsrvAdmin=new WprsrvAdmin(jQuery),window.WprsrvAdmin.initialize()});