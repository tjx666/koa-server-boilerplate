'use strict';


try {
    throw new Error('hahahah...');
} catch(err) {
    console.log(err.name, err.message);
}