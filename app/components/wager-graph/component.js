import Ember from 'ember';

export default Ember.Component.extend({
  wagers: [
    {
      bet: 250000000,
      bet_diff: -2033325,
      bet_y: 119,
      color: "#563444",
      creation_date: "2015-12-15T15:50:06.000Z",
      deviation: 0.08256880733944953,
      draw_max: 275000000,
      draw_min: 237500000,
      mapped_marker: 430.4347826086957,
      mapped_max: 468.47826086956525,
      mapped_min: 411.4130434782609,
      max_range: 275000000,
      message: "",
      min_range: 237500000,
      pic_y: 48,
      profile_image_url: "http://pbs.twimg.com/profile_images/653209730526105600/M4LLBAER_normal.jpg",
      profile_url: "http://t.co/iWPYu581p7",
      text_name_y: 30,
      tweet_id_str: "676791347853004801",
      user_fullname: "Kimberly Cottle",
      user_id_str: "147718808",
      user_username: "Kimmyraecottle",
      vert_track: 1
    }, {
      bet: 295000000,
      bet_diff: 22966675,
      bet_y: 239,
      color: "#4F8699",
      creation_date: "2015-12-17T23:30:14.000Z",
      deviation: 0.26146788990825687,
      draw_max: 237500000,
      draw_min: 192500000,
      mapped_marker: 392.3913043478261,
      mapped_max: 411.4130434782609,
      mapped_min: 342.9347826086957,
      max_range: 237500000,
      message: "",
      min_range: 192500000,
      pic_y: 168,
      profile_image_url: "http://pbs.twimg.com/profile_images/593898071559376896/eJOvM4PH_normal.jpg",
      profile_url: null,
      text_name_y: 150,
      tweet_id_str: "677631922751807489",
      user_fullname: "Elisabeth Jeffs",
      user_id_str: "706024506",
      user_username: "beth_tweets",
      vert_track: 0
    }
  ],

  didInsertElement() {
    let wagers = this.get('wagers');
    let movie_data = { wagers };
    var newDiv = document.createElement('div');
    newDiv.className = 'graphentry';
    var container = document.getElementById('graphs');
    container.appendChild(newDiv);
    this.create_movie_chart(movie_data, newDiv);
  },

  average(a, b) {
      return (a+b) / 2;
  },

  roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === 'undefined' ) {
        stroke = true;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (stroke) {
        ctx.stroke();
    }
    if (fill) {
        ctx.fill();
    }
  },

  drawSpeechBubble(ctx, x, y, width, height, radius, talk_point_offset_x, talk_point_offset_y) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);//upper left
    ctx.lineTo(x + width - radius, y);//top
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius); //right
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height); //bottom
    //ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x + talk_point_offset_x, y + height + talk_point_offset_y);
    ctx.lineTo(x, y+height - radius);
    //
    ctx.lineTo(x, y + radius);//left
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  },


  map_x(min_x, max_x, pixel_min, pixel_max, value) {
    if (value < min_x || value > max_x) {
      return null;
    } else {
      var mult = (pixel_max - pixel_min) / (max_x - min_x);
      return ((value - min_x) * mult) + pixel_min;
    }
  },

  format_money_string(value) {
    if (value >= 1000000) // millions
    {
        return '$' + (+(value / 1000000).toFixed(2)) + 'M';
    }
    else if (value >= 10000) // high thousands
    {
        return '$' + (+(value / 1000).toFixed(2)) + 'K';
    }
    else
    {
        return '$' + value;
    }
  },

  create_movie_chart(movie_data, graphentry) {
    // Title
    var title_div = document.createElement('div');
    var wagers = movie_data.wagers;
    title_div.className = 'graph_title';
    graphentry.appendChild(title_div);
    if (movie_data.movieTitle !== undefined)
    {
        title_div.innerHTML = movie_data.movieTitle;
        var subtitle = document.createElement('span');
        subtitle.className = 'graph_subtitle';
        subtitle.innerHTML = '(' + movie_data.name + ')';
        title_div.appendChild(subtitle);
    }
    else
    {
        title_div.innerHTML = movie_data.name;
    }
    var needed_chart_height = title_div.clientHeight+170; // Make sure there is room for the titles
    // Put movie poster on the left
    if (movie_data.posterURL !== undefined)
    {
        // Poster
        var poster = document.createElement('div');
        poster.className = 'graph_poster';
        graphentry.appendChild(poster);
        var poster_image = document.createElement('img');
        poster_image.src = movie_data.posterURL;

        poster_image.style.height = 'auto';
        poster_image.style.maxHeight = '100%';
        poster_image.style.width = 'auto';
        poster_image.style.maxWidth = '100%';
        poster.appendChild(poster_image);
    }

    var graphholder = document.createElement('div');
    graphholder.className = 'graphholder';
    graphentry.appendChild(graphholder);

    // Sort wager data
    wagers.sort(function(a,b){return a.bet - b.bet;});

    var colors = [ '#1BB0CE', '#6A5E72', '#4F8699', '#563444' ];
    var winning_color = '#ffe837';
    var last_pixel_used = [-100, -100, -100];
    var graph_width = 800;
    var chart_min_pixel = 50, chart_max_pixel = graph_width - 50;
    var y_space_per_wager_marker = 120;
    var iter;

    ////////////////// Get graph extents
    var min_x = 0;
    var max_x = 0;
    if ( wagers.length > 0 )
    {
        // three wagers or less version:
        if (wagers.length <= 3 )
        {
            min_x = movie_data.wagers[ 0 ].bet;
            max_x = movie_data.wagers[ wagers.length - 1 ].bet;
        }
        else // four wagers or more, the version where we remove outliers
        {
            // get the average bet
            var average_bet = 0;
            for (iter = 0; iter < wagers.length; ++iter )
            {
                average_bet += movie_data.wagers[iter].bet;
            }
            average_bet = average_bet / wagers.length;
            // Calculate deviation
            for (iter = 0; iter < wagers.length; ++iter )
            {
                movie_data.wagers[iter].deviation = Math.abs(movie_data.wagers[iter].bet - average_bet);
            }
            // Calculate standard deviation (may be mis-using that term)
            var standard_deviation = 0;
            for (iter = 0; iter < wagers.length; ++iter )
            {
                standard_deviation += movie_data.wagers[iter].deviation;
            }
            standard_deviation = standard_deviation / wagers.length;
            // normalize all deviations
            if (standard_deviation !== 0)
            {
                for (iter = 0; iter < wagers.length; ++iter )
                {
                    movie_data.wagers[iter].deviation = movie_data.wagers[iter].deviation / standard_deviation;
                }
            }
            // Now account for all bets that are within 2.46 standard deviations
            min_x = undefined;
            max_x = undefined;
            for (iter = 0; iter < wagers.length; ++iter )
            {
                if (movie_data.wagers[iter].deviation <= 2.46)
                {
                    if (min_x === undefined || movie_data.wagers[iter].bet < min_x) { min_x = movie_data.wagers[iter].bet; }
                    if (max_x === undefined || movie_data.wagers[iter].bet > max_x) { max_x = movie_data.wagers[iter].bet; }
                }
            }
            // I don't think this is statistically possible, but if no bets qualify, just use the other method.
            if (min_x === undefined || max_x === undefined)
            {
                min_x = movie_data.wagers[ 0 ].bet;
                max_x = movie_data.wagers[ wagers.length - 1 ].bet;
            }
        }
    }
    // make sure result is framed
    if (movie_data.result !== undefined && max_x < movie_data.result ) { max_x = movie_data.result; }
    if (movie_data.result !== undefined && min_x > movie_data.result ) { min_x = movie_data.result; }
    // sanity checks
    if (min_x < 0 ) { min_x = 0; }
    // scale if they are all bunched up on the right
    var bet_range = max_x - min_x;
    if (wagers.length > 1 && ( bet_range / max_x < 0.4)) // if bets take up less than 30%
    {
        min_x = max_x - (bet_range*1.75); // make it take up only half the graph
    }
    else
    {
        min_x = 0;  // don't bother scaling
    }
    max_x = max_x + (0.15 * (max_x-min_x));   // buffer the right

    ////////////////////// Build min and max ranges for each wager
    var highest_track_used = 0;
    var wager;
    for(iter = 0; iter < wagers.length; ++iter)
    {
        wager = movie_data.wagers[iter];
        var last_wager = null;
        var next_wager = null;
        if (iter > 0 ) {last_wager = movie_data.wagers[iter-1];}
        if (iter+1 < wagers.length) {next_wager = movie_data.wagers[iter+1];}

        if (last_wager !== null)
        {
            wager.min_range = this.average(wager.bet, last_wager.bet);
        }
        else
        {
            wager.min_range = 0;
        }

        if (next_wager !== null)
        {
            wager.max_range = this.average(wager.bet, next_wager.bet);
        }
        else
        {
            wager.max_range = max_x;
        }

        // Calcuate the bounds of our rendering
        wager.draw_min = wager.min_range;
        wager.draw_max = wager.max_range;
        if (wager.draw_min < min_x) { wager.draw_min = min_x; }
        if (wager.draw_max > max_x) { wager.draw_max = max_x; }
        wager.mapped_min = this.map_x(min_x, max_x, chart_min_pixel, chart_max_pixel, wager.draw_min);
        wager.mapped_max = this.map_x(min_x, max_x, chart_min_pixel, chart_max_pixel, wager.draw_max);
        wager.mapped_marker = this.map_x(min_x, max_x, chart_min_pixel, chart_max_pixel, wager.bet);
        // Determine height of picture/bet/name
        wager.vert_track = 0;
        var most_track_room = null;
        for (var vti = 0; vti < last_pixel_used.length; ++vti) {
          var track_room = wager.mapped_marker - last_pixel_used[vti] - 25; // calc room needed on the left
          // if there's room on the lowest track, we're done
          if (track_room > 0) {
            wager.vert_track = vti;
            break;
          }
          // otherwise find the best track
          if (most_track_room === null || track_room > most_track_room ) // if there's room
          {
            wager.vert_track = vti;
            most_track_room = track_room;
          }
        }
        // log how much space we used
        if (wager.vert_track > highest_track_used) { highest_track_used = wager.vert_track; }
        last_pixel_used[wager.vert_track] = wager.mapped_marker + 30; // claim our forward real estate
    }

    // We can figure out how tall we need the div now
    var graph_height = 200 - (200 - 60 - 115 - (highest_track_used * y_space_per_wager_marker)) + 30;
    if (graph_height < 200) {graph_height = 200;}
    if (graph_height < needed_chart_height) {graph_height = needed_chart_height;}
    graphholder.width = graph_width;
    graphholder.height = graph_height;
    var canvas = document.createElement('canvas');
    canvas.className = 'graph';
    canvas.width  = graphholder.width;
    canvas.height = graphholder.height;
    graphholder.appendChild(canvas);
    // And fill out the rest of the metrics.
    var bar_y = graphholder.height - 60;
    var bar_height = 17;
    var tick_y = bar_y + bar_height + 15;
    var pic_height = 50;


    // Now we can set the Y's
    for(iter = 0; iter < wagers.length; ++iter)
    {
        wager = movie_data.wagers[iter];
        wager.text_name_y = bar_y - 115 - (wager.vert_track * y_space_per_wager_marker);
        wager.pic_y = wager.text_name_y + 18;
        //var bet_y = (wager.pic_y + pic_height) + ((bar_y - wager.pic_y - pic_height)*0.5);
        wager.bet_y = (wager.pic_y + pic_height) + 21;
    }

    // render graph
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height); // clear canvas
    // draw background grid
    ctx.strokeStyle = 'rgba(165, 229, 234, 0.59)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    // draw vert lines
    var gbot = canvas.height-1;
    var gmid = gbot - 20;
    var gtop = canvas.height - 200;
    var gleft = 40;
    var gright = 0;
    for(var gx = gleft; gx <= canvas.width - 25; gx = gx + 50)
    {
        ctx.moveTo(gx, gbot);
        ctx.lineTo(gx+25, gmid);
        ctx.lineTo(gx+25, gtop);
        gright = gx+25;
    }
    // draw horz lines
    var gy;
    for(gy = gtop; gy <= gmid; gy = gy + 50)
    {
        ctx.moveTo(gleft+25, gy);
        ctx.lineTo(gright, gy);
    }
    for(gy = gmid; gy <= gbot; gy = gy + 10)
    {
        var offset = (gy - gmid) * ((25)/(gbot-gmid));
        ctx.moveTo(gleft+25 - offset, gy);
        ctx.lineTo(gright - offset, gy);
    }
    ctx.stroke();
    // Draw title
    ctx.fillStyle = 'black';
    ctx.font = 'bold 24px sans-serif';

    // Draw wagers and bar segments, back to front
    var track_iter, draw_iter;
    for(track_iter = last_pixel_used.length-1; track_iter >= 0; --track_iter)
    {
        for(draw_iter = 0; draw_iter < wagers.length; ++draw_iter)
        {
            var draw_wager = movie_data.wagers[draw_iter];
            if (draw_wager.vert_track === track_iter && draw_wager.mapped_marker !== null) {
              draw_wager.color = colors[ draw_iter % colors.length ];

              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = 'black';
              ctx.font = '12px sans-serif';

              ctx.fillStyle = draw_wager.color;
              ctx.strokeStyle = ctx.fillStyle;
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.moveTo(draw_wager.mapped_marker, draw_wager.text_name_y);//draw_wager.pic_y + pic_height);
              ctx.lineTo(draw_wager.mapped_marker, bar_y);
              ctx.stroke();
              // Draw wager bubble
              ctx.fillStyle = '#FFFFFF';
              ctx.lineWidth = 6;
              var bet_text = this.format_money_string(draw_wager.bet);
              var text_metrics = ctx.measureText(bet_text);
              this.roundRect(ctx, draw_wager.mapped_marker - (text_metrics.width+6)/2, draw_wager.bet_y - 8, (text_metrics.width+6), 16, 8, true, true);
              ctx.fillStyle = colors[ draw_iter % colors.length ];
              ctx.fillText(bet_text, draw_wager.mapped_marker, draw_wager.bet_y);
              ctx.lineWidth = 3;
              // draw twitter name
              ctx.font = '14px sans-serif';
              ctx.fillStyle = colors[ draw_iter % colors.length ];
              text_metrics = ctx.measureText(draw_wager.user_fullname);
              var placard_buffer = 4;
              this.roundRect(ctx, draw_wager.mapped_marker - (text_metrics.width*0.5) - placard_buffer, draw_wager.text_name_y - (7) - placard_buffer, text_metrics.width+(placard_buffer*2), 14 + (placard_buffer*2), 5, true, false);
              ctx.fillStyle = '#FFFFFF';
              ctx.fillText(draw_wager.user_fullname, draw_wager.mapped_marker, draw_wager.text_name_y);
              ctx.font = '10px sans-serif';
              ctx.fillStyle = colors[ draw_iter % colors.length ];
              ///////////////////////////
              // Draw profile icon
              this.roundRect(ctx, draw_wager.mapped_marker - 30, draw_wager.pic_y - 5, 60, 60, 7, true, false);
              var profileContainer = document.createElement('span');
              profileContainer.style.position = 'absolute';
              profileContainer.style.left = ( draw_wager.mapped_marker - 25).toString() + 'px';
              profileContainer.style.top = ( draw_wager.pic_y).toString() + 'px';
              graphholder.appendChild(profileContainer);
              var profilePic = document.createElement('img');
              profilePic.width  = pic_height;
              profilePic.height = pic_height;
              profilePic.src = draw_wager.profile_image_url;
              profileContainer.appendChild(profilePic);
              // Draw the actual bar on the graph
              ctx.beginPath();
              ctx.rect(draw_wager.mapped_min, bar_y, draw_wager.mapped_max - draw_wager.mapped_min, bar_height);
              ctx.fill();
              ctx.closePath();
            }
        }
    } // draw wagers wager iter

    // Build chat bubbles on top
    // Draw wagers and bar segments, back to front
    for(track_iter = last_pixel_used.length-1; track_iter >= 0; --track_iter) {
        for(draw_iter = 0; draw_iter < wagers.length; ++draw_iter) {
            wager = movie_data.wagers[draw_iter];
            if (wager.vert_track === track_iter && wager.mapped_marker !== null) {
                ///////////////////////////
                // Draw chat bubble
                var chat_hot_rect = document.createElement('a');
                chat_hot_rect.className = 'graph_pic';
                chat_hot_rect.href = '/users/' + wager.user_username;
                chat_hot_rect.style.position = 'absolute';
                chat_hot_rect.style.left = ( wager.mapped_marker - 25).toString() + 'px';
                chat_hot_rect.style.top = ( wager.pic_y).toString() + 'px';
                chat_hot_rect.style.width = '50px';
                chat_hot_rect.style.height = '50px';
                graphholder.appendChild(chat_hot_rect);

                if (wager.message !== undefined && wager.message.length > 0) {
                    var chatContainer = document.createElement('div');
                    chatContainer.className = 'chat_container';
                    chat_hot_rect.appendChild(chatContainer);

                    var chatCanvas = document.createElement('canvas');
                    chatCanvas.className = 'chat_text';
                    var chatcontext = chatCanvas.getContext('2d');
                    chatcontext.font = '16px sans-serif';
                    chatcontext.textBaseline = 'middle';

                    // Determine how many lines of text
                    var words = wager.message.split(' ');
                    var lines = [];
                    var line = '';
                    var maxWidth = 150;
                    var widest_text = 0;
                    for(var n = 0; n < words.length; n++) {
                        var testLine = line + words[n] + ' ';
                        var metrics = chatcontext.measureText(testLine);
                        var testWidth = metrics.width;
                        if (testWidth > maxWidth && n > 0) {
                            metrics = chatcontext.measureText(line);
                            if ( metrics.width > widest_text ) {widest_text = metrics.width;}
                            lines.push(line);
                            line = words[n] + ' ';
                        } else {
                            line = testLine;
                        }
                    }

                    lines.push(line);
                    var metrics2 = chatcontext.measureText(line);
                    if ( metrics2.width > widest_text ) {widest_text = metrics2.width;}

                    var bubble_width = widest_text + 60;
                    var bubble_height = 16 * lines.length + 30;
                    chatCanvas.width = bubble_width;
                    chatCanvas.height= bubble_height;

                    chatcontext.fillStyle = 'white';
                    chatcontext.lineWidth = 8;
                    chatcontext.strokeStyle = 'black';
                    var talk_point_x_offset = -5;
                    var talk_point_y_offset = 2;
                    this.drawSpeechBubble(chatcontext, -talk_point_x_offset + chatcontext.lineWidth,
                                     chatcontext.lineWidth,
                                     chatCanvas.width - chatcontext.lineWidth - (-talk_point_x_offset + chatcontext.lineWidth),
                                     chatCanvas.height - chatcontext.lineWidth - (talk_point_y_offset + chatcontext.lineWidth),
                                     10,talk_point_x_offset, talk_point_y_offset);
                    chatcontext.fillStyle = 'black';
                    chatcontext.font = '16px sans-serif';
                    for (var line_iter = 0; line_iter < lines.length; ++line_iter)
                    {
                        chatcontext.fillText(lines[line_iter], 30, 28 + (line_iter * 16));
                    }
                    chatContainer.appendChild(chatCanvas);
                }
            }
        }
    }

    // Draw Result
    if (movie_data.result !== undefined) {
      var result_text = 'Result';
      var result_text_y = bar_y - 15;

      ctx.fillStyle = winning_color;
      ctx.strokeStyle = winning_color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      var mapped_result = this.map_x(min_x, max_x, chart_min_pixel, chart_max_pixel, movie_data.result);
      if (mapped_result !== null) {
        ctx.moveTo(mapped_result, result_text_y);
        ctx.lineTo(mapped_result, bar_y + bar_height);
        ctx.stroke();

        ctx.font = '14px sans-serif';
        var winner_metrics = ctx.measureText(result_text);
        this.roundRect(ctx, mapped_result - (winner_metrics.width*0.5) - 3, result_text_y - (7) - 3, winner_metrics.width+6, 14 + 6, 5, true, false);
        ctx.fillStyle = 'black';
        ctx.textBaseline = 'middle';
        ctx.fillText(result_text, mapped_result, result_text_y);
      }
    }

    // Draw ticks
    var range = max_x - min_x;
    var tickGranulation = 0;
    if ( range > 1000000000 ) // more than a billion
    {
        tickGranulation = 0;
    }
    else if ( range > 200000000 ) // more than 200 million
    {
        tickGranulation = 30000000; // 30 million tick spacing
    }
    else if ( range > 65000000 ) // more than 65 million
    {
        tickGranulation = 10000000; // 10 million tick spacing
    }
    else if ( range > 45000000 ) // more than 45 million
    {
        tickGranulation = 10000000; // 10 million tick spacing
    }
    else if ( range > 35000000 ) // more than 35 million
    {
        tickGranulation = 5000000; // 5 million tick spacing
    }
    else if ( range > 20000000 ) // more than 20 million
    {
        tickGranulation = 4000000; // 4 million tick spacing
    }
    else if ( range > 10000000 ) // more than 10 million
    {
        tickGranulation = 3000000; // 3 million tick spacing
    }
    else
    {
        tickGranulation = 500000; // 500 thousand tick spacing
    }
    if (tickGranulation > 0 )
    {
        for (var tickIter = 0; tickIter <= max_x; tickIter += tickGranulation)
        {
            var mapped_tick = this.map_x(min_x, max_x, chart_min_pixel, chart_max_pixel, tickIter);
            if (mapped_tick !== null)
            {
                ctx.textAlign = 'center';
                ctx.fillStyle = 'black';
                ctx.font = '10px sans-serif';
                ctx.fillText(this.format_money_string(tickIter), mapped_tick, tick_y);
            }
        }
    }
  }
});
