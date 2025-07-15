import { useCallback, useState } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Button } from "../ui";
import { ExternalLink } from "lucide-react";
import { Link } from "../custom";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url,
).toString();
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
	cMapUrl: "/cmaps/",
	standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 800;

type StudenFeePdfProps = {
	file: string;
};

export function StudenFeePdf({ file }: StudenFeePdfProps) {
	const [numPages, setNumPages] = useState<number>();
	const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
	const [containerWidth, setContainerWidth] = useState<number>();

	const onResize = useCallback<ResizeObserverCallback>((entries) => {
		const [entry] = entries;

		if (entry) {
			setContainerWidth(entry.contentRect.width);
		}
	}, []);

	useResizeObserver(containerRef, resizeObserverOptions, onResize);

	function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
		setNumPages(numPages);
	}

	return (
		<div
			ref={setContainerRef}
			className="border max-w-screen-md w-full !aspect-[1.41] rounded-md p-2 space-y-2"
		>
			<Link variant="outline" to={file} target="_blank">
				<ExternalLink />
				Open in New Tab
			</Link>

			<Document
				className="w-full aspect-a4"
				file={file}
				onLoadSuccess={onDocumentLoadSuccess}
				options={options}
			>
				{Array.from(new Array(1), (_, index) => (
					<Page
						key={`page_${index + 1}`}
						pageNumber={index + 1}
						width={
							containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
						}
					/>
				))}
			</Document>
		</div>
	);
}
