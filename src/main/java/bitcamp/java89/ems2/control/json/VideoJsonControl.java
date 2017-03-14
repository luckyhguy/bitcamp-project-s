package bitcamp.java89.ems2.control.json;

import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bitcamp.java89.ems2.domain.Member;
import bitcamp.java89.ems2.domain.Video;
import bitcamp.java89.ems2.service.VideoService;

//@Controller
@RestController // 이 애노테이션을 붙이면, 스프링 설정 파일에 JSON 변환기 'MappingJackson2JsonView' 객체를 등록하지 않아도 된다.
public class VideoJsonControl {
  @Autowired ServletContext sc;
  
  @Autowired VideoService videoService;
  
  @RequestMapping("/video/list")
  public AjaxResult list(@RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="5") int pageSize) throws Exception {
    
    if (pageNo < 1) {
      pageNo = 1;
    }
    
    if (pageSize < 5 || pageSize > 20) {
      pageSize = 5;
    }

    List<Video> list = videoService.getList(pageNo, pageSize);
    List<Member> name = videoService.selectName();
    int totalCount = videoService.getSize();
    
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("list", list);
    resultMap.put("name", name);
    resultMap.put("totalCount", totalCount);
    
    return new AjaxResult(AjaxResult.SUCCESS, resultMap);
  }
  
 /* @RequestMapping("/video/detail")
  public AjaxResult detail(int memberNo) throws Exception {
    Video video = videoService.getDetail(memberNo);
    
    if (video == null) {
      return new AjaxResult(AjaxResult.FAIL, "해당 학생이 없습니다.");
    }
    
    return new AjaxResult(AjaxResult.SUCCESS, video);
  }
  @RequestMapping("/video/add")
  public AjaxResult add(Video video) throws Exception {
    videoService.add(video);
    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }

  @RequestMapping("/video/delete")
  public AjaxResult delete(int memberNo, HttpServletRequest request) throws Exception {
    int count = videoService.delete(memberNo);
    if (count == 0) {
      return new AjaxResult(AjaxResult.FAIL, "해당 번호의 학생이 없습니다.");
    }
    return new AjaxResult(AjaxResult.SUCCESS, "삭제 성공입니다.");
  }
  
  @RequestMapping("/video/update")
  public AjaxResult update(Video video) throws Exception {

    int count = videoService.update(video);
    
    if (count == 0) {
      return new AjaxResult(AjaxResult.FAIL, "해당 번호의 학생이 없습니다.");
    }
    
    return new AjaxResult(AjaxResult.SUCCESS, "변경 성공입니다.");
  }*/
}




