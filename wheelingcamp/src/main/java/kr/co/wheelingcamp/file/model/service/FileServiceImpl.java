package kr.co.wheelingcamp.file.model.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import kr.co.wheelingcamp.common.util.RenameFile;
import kr.co.wheelingcamp.file.model.dto.BoardImage;
import kr.co.wheelingcamp.file.model.dto.ItemImage;
import kr.co.wheelingcamp.file.model.dto.MemberImage;
import kr.co.wheelingcamp.file.model.mapper.FileMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@PropertySource("classpath:/config.properties")
@Transactional(rollbackFor = Exception.class)
public class FileServiceImpl implements FileService {

	private final FileMapper mapper;

	// 회원 이미지 경로 //--------------------------------------------------
	@Value("${member.web-path}")
	private String memberWebPath;

	@Value("${member.folder-path}")
	private String memberFolderPath;

	// 상품 이미지 경로 //--------------------------------------------------
	@Value("${item.web-path}")
	private String itemWebPath;

	@Value("${item.folder-path}")
	private String itemFolderPath;

	// 게시판 이미지 경로 //--------------------------------------------------
	@Value("${board.web-path}")
	private String boardWebPath;

	@Value("${board.folder-path}")
	private String boardFolderPath;

	@Override
	public int uploadImageList(int objectNo, List<MultipartFile> imageList, String type)
			throws IllegalStateException, IOException {
		int result = 0;

		List uploadList = new ArrayList<>();

		for (int i = 0; i < imageList.size(); i++) {
			// 실제 파일이 존재하는 경우
			if (!imageList.get(i).isEmpty()) {
				// 원본명
				String originalName = imageList.get(i).getOriginalFilename();

				// 변경명
				String rename = RenameFile.fileRename(originalName);

				// 모든 값을 저장할 DTO 생성
				switch (type) {
				case "member": // 회원인 경우
					MemberImage memberImg = new MemberImage();
					memberImg.setImgOriginalName(originalName);
					memberImg.setImgRename(rename);
					memberImg.setImgPath(memberWebPath);
					memberImg.setMemberNo(objectNo);
					memberImg.setImgOrder(i);
					memberImg.setUploadFile(imageList.get(i));

					uploadList.add(memberImg);
					break;
				case "item": // 상품인 경우
					ItemImage itemImg = new ItemImage();
					itemImg.setImgOriginalName(originalName);
					itemImg.setImgRename(rename);
					itemImg.setImgPath(memberWebPath);
					itemImg.setItemNo(objectNo);
					itemImg.setImgOrder(i);
					itemImg.setUploadFile(imageList.get(i));

					uploadList.add(itemImg);
					break;
				case "board": // 게시판인 경우
					BoardImage boardImg = new BoardImage();
					boardImg.setImgOriginalName(originalName);
					boardImg.setImgRename(rename);
					boardImg.setImgPath(memberWebPath);
					boardImg.setBoardNo(objectNo);
					boardImg.setImgOrder(i);
					boardImg.setUploadFile(imageList.get(i));

					uploadList.add(boardImg);
					break;

				default: // type이 정의되지 않은 경우
					break;
				}
			}
		}

		// DB에 저장 후 결과 반환
		result = mapper.uploadImageList(uploadList, type);

		switch (type) {
		case "member": // 회원인 경우
			if (result == uploadList.size()) {
				// 서버에 파일 저장
				for (MemberImage img : (List<MemberImage>) uploadList) {
					img.getUploadFile().transferTo(new File(memberFolderPath + img.getImgRename()));
				}
			}
			break;
		case "item": // 상품인 경우
			if (result == uploadList.size()) {
				// 서버에 파일 저장
				for (ItemImage img : (List<ItemImage>) uploadList) {
					img.getUploadFile().transferTo(new File(itemFolderPath + img.getImgRename()));
				}
			}
			break;
		case "board": // 게시판인 경우
			if (result == uploadList.size()) {
				// 서버에 파일 저장
				for (BoardImage img : (List<BoardImage>) uploadList) {
					img.getUploadFile().transferTo(new File(boardFolderPath + img.getImgRename()));
				}
			}
			break;

		default: // type이 정의되지 않은 경우
			result = 0;
			break;
		}

		// 선택한 파일이 존재하지 않으면
		if (uploadList.isEmpty()) {
			return 0;
		}

		// 결과
		return result;

	}

}
