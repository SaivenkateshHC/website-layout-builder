import { useNode } from "@craftjs/core";
import {Slider, FormControl, FormLabel, Box} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import ColorPicker from "material-ui-color-picker";

export const Text = ({ text, fontSize,color, textAlign, ...props }) => {
	const {
		connectors: { connect, drag },
		selected,
		actions: { setProp }
	} = useNode((state) => ({
		selected: state.events.selected,
		dragged: state.events.dragged
	}));

	const [editable, setEditable] = useState(false);

	useEffect(() => {
		if (selected) {
			return;
		}

		setEditable(false);
	}, [selected]);

	return (
		<div
			{...props}
			ref={(ref) => connect(drag(ref))}
			onClick={() => selected && setEditable(true)}
		>
			<ContentEditable
				html={text}
				disabled={!editable}
				onChange={(e) =>
					setProp(
						(props) =>
							(props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")),
						500
					)
				}
				tagName="p"
				style={{ fontSize: `${fontSize}px`, textAlign, color }}
			/>
		</div>
	);
};

const TextSettings = () => {
	const {
		actions: { setProp },
		fontSize,
		color
	} = useNode((node) => ({
		text: node.data.props.text,
		fontSize: node.data.props.fontSize,
		color: node.data.props.color,
	}));

	return (
		<Box sx={{ padding: 16 }}>
			<FormControl size="small" component="fieldset">
				<FormLabel component="legend">Font size</FormLabel>
				<Slider
					value={fontSize || 7}
					step={7}
					min={1}
					max={50}
					onChange={(_, value) => {
						setProp((props) => (props.fontSize = value), 1000);
					}}
				/>
			{/*</FormControl>*/}
			{/*<FormControl size="small" component="fieldset">*/}
				<FormLabel component="legend">Font Color</FormLabel>
				<ColorPicker
					name="color"
					value={color}
					onChange={(color) => {
						setProp((props) => (props.color = color), 500);
					}}
				/>
			</FormControl>
		</Box>
	);
};

export const TextDefaultProps = {
	text: "Hi",
	fontSize: 20
};

Text.craft = {
	props: TextDefaultProps,
	related: {
		settings: TextSettings
	}
};
