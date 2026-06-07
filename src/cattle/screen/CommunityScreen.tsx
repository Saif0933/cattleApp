import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  useAcceptAnswer,
  useCastVote,
  useCreateAnswer,
  useCreateQuestion,
  useGetAnswers,
  useGetQuestions,
  useToggleBookmark,
  useGetBookmarks,
} from '../../api/hook/forum';
import { useUser } from '../../context/UserContext';
import { useThemeColors } from '../../context/useTheme';
import type { ForumAnswer, ForumQuestion } from '../../types/forum.types';

const { width, height } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const CATEGORIES = [
  { id: 'ALL', label: 'All Feed', icon: 'explore', color: '#10B981' },
  { id: 'GENERAL', label: 'General', icon: 'chat', color: '#3B82F6' },
  { id: 'DISEASE_ALERT', label: 'Disease Alert', icon: 'warning', color: '#EF4444' },
  { id: 'BREEDING_TIPS', label: 'Breeding Tips', icon: 'favorite', color: '#EC4899' },
  { id: 'FEED_MANAGEMENT', label: 'Feed Management', icon: 'grass', color: '#16A34A' },
  { id: 'GOVERNMENT_SCHEMES', label: 'Gov Schemes', icon: 'gavel', color: '#F59E0B' },
];

const CommunityScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);
  const { user } = useUser();

  // Selected state for filters and modals
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedQuestion, setSelectedQuestion] = useState<ForumQuestion | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form states for creating a question
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('GENERAL');

  // Reply/Answer state
  const [replyText, setReplyText] = useState('');

  // Fetching Questions
  const {
    data: questionsRes,
    isLoading: isQuestionsLoading,
    isFetching: isQuestionsFetching,
    refetch: refetchQuestions,
  } = useGetQuestions({
    tag: selectedCategory !== 'ALL' ? selectedCategory : undefined,
    limit: 50,
    sort: 'recent',
  });

  const questions = questionsRes?.data?.questions || [];

  // Bookmarks
  const { data: bookmarksRes, refetch: refetchBookmarks } = useGetBookmarks();
  const [localBookmarks, setLocalBookmarks] = useState<string[]>([]);

  useEffect(() => {
    if (bookmarksRes?.data?.bookmarks) {
      setLocalBookmarks(bookmarksRes.data.bookmarks.map((b: any) => b.questionId));
    }
  }, [bookmarksRes]);

  const { mutate: toggleBookmark } = useToggleBookmark({
    onSuccess: () => {
      refetchBookmarks();
    }
  });

  const handleToggleBookmark = (questionId: string) => {
    setLocalBookmarks(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId) 
        : [...prev, questionId]
    );
    toggleBookmark({ questionId });
  };

  // Mutations
  const { mutate: createQuestion, isPending: isCreatingQuestion } = useCreateQuestion({
    onSuccess: () => {
      setIsCreateModalOpen(false);
      setNewTitle('');
      setNewContent('');
      setNewCategory('GENERAL');
      refetchQuestions();
    },
  });

  const { mutate: castVote } = useCastVote({
    onSuccess: () => {
      refetchQuestions();
    },
  });

  const handleVote = (targetType: 'QUESTION' | 'ANSWER', targetId: string, voteType: 'UPVOTE' | 'DOWNVOTE') => {
    castVote({
      targetType,
      targetId,
      voteType,
    });
  };

  const handleCreateQuestion = () => {
    if (!newTitle.trim() || !newContent.trim()) {
      Alert.alert('Required Fields', 'Please enter a title and description.');
      return;
    }
    createQuestion({
      title: newTitle,
      content: newContent,
      tags: [newCategory],
    });
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'F';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const formatTime = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return '';
      
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = months[date.getMonth()];
      const day = date.getDate();
      
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      
      return `${month} ${day} ${hours}:${minutes} ${ampm}`;
    } catch {
      return '';
    }
  };

  const renderQuestionItem = ({ item }: { item: ForumQuestion }) => {
    const questionCategory = item.tags && item.tags.length > 0 ? item.tags[0] : 'GENERAL';
    const catConfig = CATEGORIES.find((c) => c.id === questionCategory) || CATEGORIES[1];
    
    // Check if the user has verified/expert badge
    const isExpertAnswered = item.isSolved;

    return (
      <TouchableOpacity
        style={styles.questionCard}
        onPress={() => setSelectedQuestion(item)}
        activeOpacity={0.9}
      >
        <View style={styles.cardHeader}>
          <View style={styles.authorSection}>
            <View style={[styles.avatarPlaceholder, { backgroundColor: catConfig.color + '20' }]}>
              <Text style={[styles.avatarText, { color: catConfig.color }]}>
                {getInitials(item.author?.name || 'Farmer')}
              </Text>
            </View>
            <View>
              <Text style={styles.authorName}>{item.author?.name || 'Farmer'}</Text>
              <Text style={styles.timeLabel}>{formatTime(item.createdAt)}</Text>
            </View>
          </View>
          <View style={[styles.catBadge, { backgroundColor: catConfig.color + '15' }]}>
            <Icon name={catConfig.icon} size={12} color={catConfig.color} />
            <Text style={[styles.catBadgeText, { color: catConfig.color }]}>{catConfig.label}</Text>
          </View>
        </View>

        <Text style={styles.questionTitle}>{item.title}</Text>
        <Text style={styles.questionSnippet} numberOfLines={3}>
          {item.content}
        </Text>

        <View style={styles.cardFooter}>
          <View style={styles.voteControls}>
            <TouchableOpacity 
              style={styles.voteButton} 
              onPress={() => handleVote('QUESTION', item.id, 'UPVOTE')}
            >
              <Icon name="arrow-upward" size={18} color={COLORS.secondary} />
            </TouchableOpacity>
            <Text style={styles.voteCount}>{item.voteScore || 0}</Text>
            <TouchableOpacity 
              style={styles.voteButton} 
              onPress={() => handleVote('QUESTION', item.id, 'DOWNVOTE')}
            >
              <Icon name="arrow-downward" size={18} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.footerRight}>
            <View style={styles.commentSummary}>
              <Icon name="forum" size={16} color={COLORS.secondary} />
              <Text style={styles.commentSummaryText}>{item.answerCount || 0} answers</Text>
              {isExpertAnswered && (
                <View style={styles.solvedBadge}>
                  <Icon name="verified" size={12} color="white" />
                  <Text style={styles.solvedBadgeText}>SOLVED</Text>
                </View>
              )}
            </View>
            <TouchableOpacity 
              style={styles.bookmarkButton}
              onPress={(e) => {
                e.stopPropagation();
                handleToggleBookmark(item.id);
              }}
            >
              <Icon 
                name={localBookmarks.includes(item.id) ? "bookmark" : "bookmark-border"} 
                size={20} 
                color={localBookmarks.includes(item.id) ? "#EF4444" : COLORS.secondary} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={COLORS.isDark ? "light-content" : "dark-content"} backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-ios" size={20} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Farmer's Community</Text>
          <Text style={styles.headerSubtitle}>Ask, share & learn from experts</Text>
        </View>
        <TouchableOpacity 
          style={styles.headerAction}
          onPress={() => setIsCreateModalOpen(true)}
        >
          <Icon name="add-comment" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Categories Horizontal Scroll */}
      <View style={styles.categoriesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryPill,
                  isSelected && { backgroundColor: COLORS.primary }
                ]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <Icon
                  name={cat.icon}
                  size={16}
                  color={isSelected ? (COLORS.isDark ? '#0F291E' : 'white') : cat.color}
                />
                <Text style={[
                  styles.categoryPillText,
                  { color: isSelected ? (COLORS.isDark ? '#0F291E' : 'white') : COLORS.primary }
                ]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Questions Feed */}
      {isQuestionsLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={questions}
          renderItem={renderQuestionItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isQuestionsFetching}
              onRefresh={refetchQuestions}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="chat-bubble-outline" size={60} color={COLORS.secondary + '80'} />
              <Text style={styles.emptyTitle}>No discussions found</Text>
              <Text style={styles.emptySubtitle}>Be the first to raise a question and start a conversation!</Text>
              <TouchableOpacity
                style={styles.askBtn}
                onPress={() => setIsCreateModalOpen(true)}
              >
                <Text style={styles.askBtnText}>Ask a Question</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}

      {/* Floating Action Button to Add Question */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setIsCreateModalOpen(true)}
        activeOpacity={0.8}
      >
        <Icon name="edit" size={24} color={COLORS.isDark ? '#0F291E' : 'white'} />
      </TouchableOpacity>

      {/* Modal to Ask / Create Question */}
      <Modal
        visible={isCreateModalOpen}
        animationType="slide"
        onRequestClose={() => setIsCreateModalOpen(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setIsCreateModalOpen(false)} style={styles.modalCloseBtn}>
              <Icon name="close" size={24} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>New Discussion</Text>
            <TouchableOpacity 
              onPress={handleCreateQuestion} 
              style={[styles.modalPostBtn, (!newTitle.trim() || !newContent.trim() || isCreatingQuestion) && styles.modalPostBtnDisabled]}
              disabled={!newTitle.trim() || !newContent.trim() || isCreatingQuestion}
            >
              {isCreatingQuestion ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.modalPostBtnText}>Post</Text>
              )}
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.modalScroll} keyboardShouldPersistTaps="handled">
            <Text style={styles.modalLabel}>Topic Title</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Jersey Cow feed recommendations"
              placeholderTextColor={COLORS.secondary + '80'}
              value={newTitle}
              onChangeText={setNewTitle}
            />

            <Text style={styles.modalLabel}>Select Category</Text>
            <View style={styles.categorySelectRow}>
              {CATEGORIES.filter(c => c.id !== 'ALL').map((cat) => {
                const isSelected = newCategory === cat.id;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.categorySelectPill,
                      isSelected && { backgroundColor: cat.color, borderColor: cat.color }
                    ]}
                    onPress={() => setNewCategory(cat.id)}
                  >
                    <Icon name={cat.icon} size={14} color={isSelected ? 'white' : cat.color} />
                    <Text style={[
                      styles.categorySelectPillText,
                      { color: isSelected ? 'white' : COLORS.primary }
                    ]}>
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.modalLabel}>Detail Description</Text>
            <TextInput
              style={[styles.modalInput, styles.modalTextArea]}
              placeholder="Provide enough details so farmers and experts can assist you..."
              placeholderTextColor={COLORS.secondary + '80'}
              value={newContent}
              onChangeText={setNewContent}
              multiline
              numberOfLines={6}
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Modal for Question Details and Answers */}
      {selectedQuestion && (
        <QuestionDetailsModal
          question={selectedQuestion}
          currentUser={user}
          COLORS={COLORS}
          onClose={() => {
            setSelectedQuestion(null);
            refetchQuestions();
          }}
          handleVote={handleVote}
          formatTime={formatTime}
          getInitials={getInitials}
          handleToggleBookmark={handleToggleBookmark}
          bookmarkedQuestionIds={localBookmarks}
        />
      )}
    </SafeAreaView>
  );
};

// Sub-Component for Question Details & Answers
const QuestionDetailsModal = ({
  question,
  currentUser,
  COLORS,
  onClose,
  handleVote,
  formatTime,
  getInitials,
  handleToggleBookmark,
  bookmarkedQuestionIds,
}: {
  question: ForumQuestion;
  currentUser: any;
  COLORS: any;
  onClose: () => void;
  handleVote: (targetType: 'QUESTION' | 'ANSWER', targetId: string, voteType: 'UPVOTE' | 'DOWNVOTE') => void;
  formatTime: (date: string) => string;
  getInitials: (name: string | null) => string;
  handleToggleBookmark: (questionId: string) => void;
  bookmarkedQuestionIds: string[];
}) => {
  const styles = getStyles(COLORS);
  const [replyText, setReplyText] = useState('');

  // Fetch Answers
  const {
    data: answersRes,
    isLoading: isAnswersLoading,
    isFetching: isAnswersFetching,
    refetch: refetchAnswers,
  } = useGetAnswers(question.id, { sort: 'votes' });

  const answers = answersRes?.data?.answers || [];

  const { mutate: createAnswer, isPending: isPostingAnswer } = useCreateAnswer({
    onSuccess: () => {
      setReplyText('');
      refetchAnswers();
    },
  });

  const { mutate: acceptAnswer } = useAcceptAnswer({
    onSuccess: () => {
      refetchAnswers();
    },
  });

  const handlePostAnswer = () => {
    if (!replyText.trim()) return;
    createAnswer({
      questionId: question.id,
      payload: { content: replyText },
    });
  };

  const handleAccept = (answerId: string) => {
    acceptAnswer(answerId);
  };

  const isQuestionOwner = currentUser && question.authorId === currentUser.id;

  const renderAnswerItem = ({ item }: { item: ForumAnswer }) => {
    return (
      <View style={[styles.answerCard, item.isAccepted && styles.acceptedAnswerCard]}>
        <View style={styles.cardHeader}>
          <View style={styles.authorSection}>
            <View style={[styles.avatarPlaceholder, { backgroundColor: '#10B98120' }]}>
              <Text style={[styles.avatarText, { color: '#10B981' }]}>
                {getInitials(item.author?.name || 'Farmer')}
              </Text>
            </View>
            <View>
              <Text style={styles.authorName}>{item.author?.name || 'Farmer'}</Text>
              <Text style={styles.timeLabel}>{formatTime(item.createdAt)}</Text>
            </View>
          </View>

          {item.isAccepted && (
            <View style={styles.expertBadge}>
              <Icon name="verified" size={10} color="white" />
              <Text style={styles.expertBadgeText}>ACCEPTED ANSWER</Text>
            </View>
          )}
        </View>

        <Text style={styles.answerText}>{item.content}</Text>

        <View style={styles.answerFooter}>
          <View style={styles.voteControls}>
            <TouchableOpacity 
              style={styles.voteButton} 
              onPress={() => handleVote('ANSWER', item.id, 'UPVOTE')}
            >
              <Icon name="arrow-upward" size={18} color={COLORS.secondary} />
            </TouchableOpacity>
            <Text style={styles.voteCount}>{item.voteScore || 0}</Text>
            <TouchableOpacity 
              style={styles.voteButton} 
              onPress={() => handleVote('ANSWER', item.id, 'DOWNVOTE')}
            >
              <Icon name="arrow-downward" size={18} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>

          {isQuestionOwner && !item.isAccepted && (
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => handleAccept(item.id)}
            >
              <Icon name="check-circle" size={16} color="#16A34A" />
              <Text style={styles.acceptButtonText}>Accept Answer</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const catConfig = CATEGORIES.find((c) => c.id === (question.tags?.[0] || 'GENERAL')) || CATEGORIES[1];

  return (
    <Modal visible={true} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
            <Icon name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.modalTitle} numberOfLines={1}>Discussion</Text>
          <TouchableOpacity 
            onPress={() => handleToggleBookmark(question.id)}
            style={styles.modalCloseBtn}
          >
            <Icon 
              name={bookmarkedQuestionIds.includes(question.id) ? "bookmark" : "bookmark-border"} 
              size={24} 
              color={bookmarkedQuestionIds.includes(question.id) ? "#EF4444" : COLORS.secondary} 
            />
          </TouchableOpacity>
        </View>

        {/* Keyboard Avoiding Container */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          {/* Answers FlatList with Question at the Header */}
          <FlatList
            data={answers}
            renderItem={renderAnswerItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.detailScrollContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isAnswersFetching}
                onRefresh={refetchAnswers}
                colors={[COLORS.primary]}
                tintColor={COLORS.primary}
              />
            }
            ListHeaderComponent={
              <View style={styles.detailQuestionCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.authorSection}>
                    <View style={[styles.avatarPlaceholder, { backgroundColor: catConfig.color + '20' }]}>
                      <Text style={[styles.avatarText, { color: catConfig.color }]}>
                        {getInitials(question.author?.name || 'Farmer')}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.authorName}>{question.author?.name || 'Farmer'}</Text>
                      <Text style={styles.timeLabel}>{formatTime(question.createdAt)}</Text>
                    </View>
                  </View>
                  <View style={[styles.catBadge, { backgroundColor: catConfig.color + '15' }]}>
                    <Icon name={catConfig.icon} size={12} color={catConfig.color} />
                    <Text style={[styles.catBadgeText, { color: catConfig.color }]}>{catConfig.label}</Text>
                  </View>
                </View>

                <Text style={styles.detailQuestionTitle}>{question.title}</Text>
                <Text style={styles.detailQuestionContent}>{question.content}</Text>

                <View style={styles.cardFooter}>
                  <View style={styles.voteControls}>
                    <TouchableOpacity 
                      style={styles.voteButton} 
                      onPress={() => handleVote('QUESTION', question.id, 'UPVOTE')}
                    >
                      <Icon name="arrow-upward" size={18} color={COLORS.secondary} />
                    </TouchableOpacity>
                    <Text style={styles.voteCount}>{question.voteScore || 0}</Text>
                    <TouchableOpacity 
                      style={styles.voteButton} 
                      onPress={() => handleVote('QUESTION', question.id, 'DOWNVOTE')}
                    >
                      <Icon name="arrow-downward" size={18} color={COLORS.secondary} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.answersCountText}>{answers.length} answers</Text>
                </View>

                <View style={styles.divider} />
                <Text style={styles.repliesHeading}>Replies & Advice</Text>
              </View>
            }
            ListEmptyComponent={
              !isAnswersLoading ? (
                <View style={styles.emptyRepliesContainer}>
                  <Icon name="forum" size={40} color={COLORS.secondary + '60'} />
                  <Text style={styles.emptyRepliesText}>No replies yet</Text>
                  <Text style={styles.emptyRepliesSubtitle}>Have some advice or knowledge? Share it below!</Text>
                </View>
              ) : null
            }
            ListFooterComponent={
              isAnswersLoading ? (
                <View style={{ padding: 20 }}>
                  <ActivityIndicator size="small" color={COLORS.primary} />
                </View>
              ) : null
            }
          />

          {/* Reply / Answer Input Area */}
          <View style={styles.inputWrapper}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Write helpful advice..."
                placeholderTextColor={COLORS.secondary + '80'}
                value={replyText}
                onChangeText={setReplyText}
                multiline
                maxLength={500}
              />
              <TouchableOpacity
                style={[styles.sendButton, (!replyText.trim() || isPostingAnswer) && styles.sendButtonDisabled]}
                onPress={handlePostAnswer}
                disabled={!replyText.trim() || isPostingAnswer}
              >
                {isPostingAnswer ? (
                  <ActivityIndicator size="small" color={COLORS.isDark ? '#0F291E' : 'white'} />
                ) : (
                  <Icon name="send" size={20} color={COLORS.isDark ? '#0F291E' : 'white'} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

const getStyles = (COLORS: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: COLORS.surface,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
    },
    backButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
    },
    headerInfo: {
      flex: 1,
      marginLeft: 10,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '900',
      color: COLORS.primary,
      fontFamily: FONT_SERIF,
    },
    headerSubtitle: {
      fontSize: 11,
      color: COLORS.secondary,
      fontWeight: '600',
    },
    headerAction: {
      padding: 5,
    },
    categoriesWrapper: {
      backgroundColor: COLORS.surface,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
    },
    categoriesScroll: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      gap: 10,
    },
    categoryPill: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.background,
      borderWidth: 1.5,
      borderColor: COLORS.border,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 20,
      gap: 6,
    },
    categoryPillText: {
      fontSize: 12,
      fontWeight: '800',
      fontFamily: FONT_SANS,
    },
    listContent: {
      paddingHorizontal: 15,
      paddingVertical: 15,
      paddingBottom: 80,
    },
    questionCard: {
      backgroundColor: COLORS.surface,
      borderRadius: 20,
      padding: 16,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: COLORS.border,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: COLORS.isDark ? 0.2 : 0.05,
      shadowRadius: 4,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    authorSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    avatarPlaceholder: {
      width: 38,
      height: 38,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      fontSize: 14,
      fontWeight: '900',
      fontFamily: FONT_SANS,
    },
    authorName: {
      fontSize: 13,
      fontWeight: '800',
      color: COLORS.primary,
    },
    timeLabel: {
      fontSize: 10,
      color: COLORS.secondary,
      marginTop: 2,
    },
    catBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      gap: 4,
    },
    catBadgeText: {
      fontSize: 10,
      fontWeight: '900',
      fontFamily: FONT_SANS,
    },
    questionTitle: {
      fontSize: 16,
      fontWeight: '900',
      color: COLORS.primary,
      fontFamily: FONT_SERIF,
      marginBottom: 6,
    },
    questionSnippet: {
      fontSize: 14,
      color: COLORS.secondary,
      lineHeight: 20,
      fontWeight: '500',
      marginBottom: 12,
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: COLORS.border,
      paddingTop: 12,
    },
    voteControls: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.background,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: COLORS.border,
      paddingHorizontal: 4,
    },
    voteButton: {
      padding: 6,
    },
    voteCount: {
      fontSize: 13,
      fontWeight: '900',
      color: COLORS.primary,
      paddingHorizontal: 6,
      minWidth: 20,
      textAlign: 'center',
    },
    footerRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    bookmarkButton: {
      padding: 6,
      marginLeft: 10,
    },
    commentSummary: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    commentSummaryText: {
      fontSize: 12,
      color: COLORS.secondary,
      fontWeight: '700',
    },
    solvedBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#10B981',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 6,
      gap: 3,
      marginLeft: 4,
    },
    solvedBadgeText: {
      color: 'white',
      fontSize: 8,
      fontWeight: '900',
    },
    fab: {
      position: 'absolute',
      bottom: 25,
      right: 20,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
    },
    // Modal & Creation style
    modalContainer: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 15,
      backgroundColor: COLORS.surface,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
    },
    modalCloseBtn: {
      padding: 4,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '900',
      color: COLORS.primary,
      fontFamily: FONT_SERIF,
      flex: 1,
      textAlign: 'center',
    },
    modalPostBtn: {
      backgroundColor: '#16A34A',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 18,
    },
    modalPostBtnDisabled: {
      backgroundColor: COLORS.secondary,
      opacity: 0.5,
    },
    modalPostBtnText: {
      color: 'white',
      fontSize: 13,
      fontWeight: '900',
    },
    modalScroll: {
      padding: 20,
    },
    modalLabel: {
      fontSize: 13,
      fontWeight: '900',
      color: COLORS.primary,
      marginBottom: 10,
      marginTop: 15,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    modalInput: {
      backgroundColor: COLORS.surface,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: COLORS.border,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 15,
      color: COLORS.primary,
      fontWeight: '600',
    },
    modalTextArea: {
      height: 150,
      textAlignVertical: 'top',
    },
    categorySelectRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginBottom: 10,
    },
    categorySelectPill: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: COLORS.border,
      borderRadius: 18,
      paddingHorizontal: 12,
      paddingVertical: 6,
      gap: 4,
    },
    categorySelectPillText: {
      fontSize: 11,
      fontWeight: '800',
    },
    // Empty state
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 60,
      paddingHorizontal: 30,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: '900',
      color: COLORS.primary,
      fontFamily: FONT_SERIF,
      marginTop: 15,
    },
    emptySubtitle: {
      fontSize: 13,
      color: COLORS.secondary,
      textAlign: 'center',
      marginTop: 6,
      lineHeight: 18,
      marginBottom: 20,
    },
    askBtn: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 24,
    },
    askBtnText: {
      color: COLORS.isDark ? '#0F291E' : 'white',
      fontWeight: '900',
      fontSize: 14,
    },
    // Detail Modal Styles
    detailScrollContent: {
      paddingBottom: 40,
    },
    detailQuestionCard: {
      backgroundColor: COLORS.surface,
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
    },
    detailQuestionTitle: {
      fontSize: 20,
      fontWeight: '900',
      color: COLORS.primary,
      fontFamily: FONT_SERIF,
      lineHeight: 28,
      marginVertical: 10,
    },
    detailQuestionContent: {
      fontSize: 15,
      color: COLORS.primary,
      lineHeight: 22,
      fontWeight: '500',
      marginBottom: 15,
    },
    answersCountText: {
      fontSize: 13,
      fontWeight: '800',
      color: COLORS.secondary,
    },
    divider: {
      height: 1,
      backgroundColor: COLORS.border,
      marginVertical: 15,
    },
    repliesHeading: {
      fontSize: 15,
      fontWeight: '900',
      color: COLORS.primary,
      fontFamily: FONT_SERIF,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    emptyRepliesContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 40,
      paddingHorizontal: 20,
    },
    emptyRepliesText: {
      fontSize: 15,
      fontWeight: '900',
      color: COLORS.primary,
      marginTop: 10,
    },
    emptyRepliesSubtitle: {
      fontSize: 12,
      color: COLORS.secondary,
      textAlign: 'center',
      marginTop: 4,
      lineHeight: 16,
    },
    answerCard: {
      backgroundColor: COLORS.surface,
      marginHorizontal: 15,
      marginTop: 15,
      padding: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: COLORS.border,
    },
    acceptedAnswerCard: {
      borderColor: '#10B981',
      borderWidth: 1.5,
      backgroundColor: COLORS.isDark ? 'rgba(16, 185, 129, 0.05)' : '#F0FDF4',
    },
    answerText: {
      fontSize: 14,
      color: COLORS.primary,
      lineHeight: 20,
      fontWeight: '500',
      marginVertical: 10,
    },
    answerFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 4,
    },
    expertBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#10B981',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 6,
      gap: 3,
    },
    expertBadgeText: {
      color: 'white',
      fontSize: 8,
      fontWeight: '900',
    },
    acceptButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      padding: 6,
    },
    acceptButtonText: {
      fontSize: 12,
      fontWeight: '800',
      color: '#16A34A',
    },
    inputWrapper: {
      padding: 15,
      borderTopWidth: 1,
      borderTopColor: COLORS.border,
      backgroundColor: COLORS.surface,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.background,
      borderRadius: 25,
      paddingHorizontal: 15,
      paddingVertical: 6,
      borderWidth: 1,
      borderColor: COLORS.border,
    },
    input: {
      flex: 1,
      marginRight: 10,
      fontSize: 14,
      color: COLORS.primary,
      maxHeight: 100,
      paddingVertical: 5,
    },
    sendButton: {
      width: 36,
      height: 36,
      backgroundColor: COLORS.primary,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendButtonDisabled: {
      backgroundColor: COLORS.secondary,
      opacity: 0.5,
    },
  });

export default CommunityScreen;
