// Custom configuration for hardolaf.com
var config = {
	lineoffset: 0,
	levels: {
		emergency: 0,
		alert: 1,
		critical: 2,
		error: 3,
		warning: 4,
		notice: 5,
		info: 6,
		debug: 7,

		emerg: 0,
		crit: 2,
		err: 3,
		warn: 4,
		note: 5,
		init: 6,

		default: 6
	}
}

// Import
require('underscore');
var level  = process.argv.indexOf('-d') === -1 ? 6 : 7;
var _logger = require('caterpillar').createLogger({config:config, level:level});
var filter = require('caterpillar-filter').createFilter();
var human  = require('caterpillar-human').createHuman();
require('colors');

// Pipe logger output to filter, then filter output to stdout
_logger.pipe(filter).pipe(human).pipe(process.stdout);

// If we are debugging, then write the original logger data to debug.log
if ( level === config.levels.debug ) {
    _logger.pipe(require('fs').createWriteStream('./debug.log'));
}

function Logger(_logger) {
	this._logger = _logger;

	// Alignment properties
	this.LEFT = 0;
	this.RIGHT = 1;
	this.CENTER = 2;
	this.str_size = 14
}

Logger.prototype = {

	// Courtesy of gmalysa
	pad: function(str, size, align) {
		if (align === undefined)
			align = this.LEFT;

		if (str.length >= size)
			return str.substring(0, size-1);

		var padding = new Array(size-str.length).join(' ');

		switch(align) {
			case this.LEFT:
				return str + padding;
			case this.RIGHT:
				return padding + str;
			case this.CENTER:
				var offset = Math.floor(padding.length/2);
				return padding.substring(0, offset) + str + padding.substring(offset, padding.length);
		}
	},

	// Short for format special part. This easily formats special parts of logs.
	fsp: function(msg, size) {
		return '[ '+this.pad(msg, size || this.str_size, this.LEFT)+' ]'
	},

	info: function(msg, module) {
		this._logger.log('info', this.fsp(module).green, msg);
	},

	module_init: function(mod_name, mod_version, msg) {
		this._logger.log('info', this.fsp(mod_name).green, this.fsp(mod_version, mod_version.length + 1).cyan, msg);
	},

	warn: function(msg) {
		this._logger.log('warn', msg);
	},

	debug: function(msg, occurrence) {
		this._logger.log('debug', this.fsp(occurrence).green, msg);
	},

	var_dump: function(error, object) {
		this._logger.log('error', object);
	},

	error: function(msg, mod_name) {
		this._logger.log('error', this.fsp(mod_name).red, msg);
	}
}

var logger = new Logger(_logger);

module.exports = logger;
