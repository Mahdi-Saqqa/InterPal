// ColumnItem.js
import React from 'react';

const ColumnItem = ({ imgSrc, title, info }) => {
  return (
<figure class="column__item">
                <div class="column__item-imgwrap">
                    <img src="https://tympanus.net/Development/ColumnScroll/18.763d23f6.jpg" alt="" title="" height="" width=""/>
                    <div class="column__item-caption">
                        <span class="title">Lorem Ipsum Dolor</span>
                        <span class="info">Quisque vel felis lectus donec vitae dapibus magna</span>
                    </div>
                </div>
            </figure>
  );
};

export default ColumnItem;
